import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {EventService} from '../../services/internal-services/event-service/event.service';
import {Event} from '../../_config/event-config';
import {City} from '../../classes/city';
import {UserInfoService} from '../../services/internal-services/user-info-service/user-info.service';
import {ImageMapperService} from '../../services/internal-services/image-mapper-service/image-mapper.service';
import {Input} from '@angular/compiler/src/core';
import {Unit} from '../../classes/unit';
import {Requirement} from '../../classes/requirement';
import {RecruitmentService} from '../../services/external-services/game-services/recruitment-service/recruitment.service';

@Component({
  selector: 'app-castle',
  templateUrl: './castle.component.html',
  styleUrls: ['./castle.component.scss'],
})
export class CastleComponent implements OnInit {

  archerToRecruit: number;
  pikemanToRecruit: number;
  cavalryToRecruit: number;
  settlerToRecruit: number;

  archerToDismiss: number;
  pikemanToDismiss: number;
  cavalryToDismiss: number;
  settlerToDismiss: number;

  maxRecruit: { [key: string]: number };
  maxDismiss: { [key: string]: number };

  eventService: EventService;
  userInfoService: UserInfoService;
  imageService: ImageMapperService;
  garrisonManagementService: RecruitmentService;

  city: City;

  archer: Unit;
  pikeman: Unit;
  cavalry: Unit;
  settler: Unit;

  unitsLoaded: boolean;

  constructor(
    eventService: EventService,
    userInfoService: UserInfoService,
    imageService: ImageMapperService,
    garrisonManagementService: RecruitmentService) {
    this.maxRecruit = {};
    this.maxDismiss = {};
    this.eventService = eventService;
    this.userInfoService = userInfoService;
    this.imageService = imageService;
    this.garrisonManagementService = garrisonManagementService;
  }

  ngOnInit() {
    this.eventService.on(Event.LOAD_CASTLE, this.onLoadCastle, this);
    this.eventService.on(Event.LOGGED_OUT, this.onLogOut, this);
    this.unitsLoaded = false;
  }

  onLoadCastle() {
    if (!this.unitsLoaded) {
      this.getUnits();
      this.unitsLoaded = true;
    }
    this.city = this.userInfoService.getActiveCity();
    this.recalculateMaxParams();
    this.eventService.emit(Event.DISPLAY_CASTLE);
  }

  onLogOut() {
    this.clear();
  }

  displayCity() {
    this.eventService.emit(Event.DISPLAY_CITY);
  }

  maxRecruitment(unit: Unit) {
    const reqs = unit.getRequirements();
    let max = Number.MAX_SAFE_INTEGER;
    for (let i = 0; i < reqs.length; i++) {
      const resource = reqs[i].resource;
      const maxForResource = Math.floor(this.city.getStorageByResource(resource) / reqs[i].quantity);
      if (maxForResource < max) {
        max = maxForResource;
      }
    }
    return max;
  }

  getUnits() {
    this.archer = this.imageService.getUnitByName('archer');
    this.pikeman = this.imageService.getUnitByName('pikeman');
    this.cavalry = this.imageService.getUnitByName('cavalry');
    this.settler = this.imageService.getUnitByName('settler');
  }

  recalculateMaxParams() {
    this.maxRecruit[this.archer.name] = this.maxRecruitment(this.archer);
    this.maxRecruit[this.pikeman.name] = this.maxRecruitment(this.pikeman);
    this.maxRecruit[this.cavalry.name] = this.maxRecruitment(this.cavalry);
    this.maxRecruit[this.settler.name] = this.maxRecruitment(this.settler);
    this.maxDismiss[this.archer.name] = this.city.getGarrisonByUnit(this.archer);
    this.maxDismiss[this.pikeman.name] = this.city.getGarrisonByUnit(this.pikeman);
    this.maxDismiss[this.cavalry.name] = this.city.getGarrisonByUnit(this.cavalry);
    this.maxDismiss[this.settler.name] = this.city.getGarrisonByUnit(this.settler);
  }

  recruit(unit: Unit, quantity: number) {
    if (quantity > this.maxRecruit[unit.name]) {
      quantity = this.maxRecruit[unit.name];
    }
    this.garrisonManagementService.recruit(this.city.id, unit.name, quantity)
      .then( response => {
        this.city.updateCity(response);
        this.recalculateMaxParams();
      });
  }

  dismiss(unit: Unit, quantity: number) {
    if (quantity > this.maxDismiss[unit.name]) {
      quantity = this.maxDismiss[unit.name];
    }
    this.garrisonManagementService.dismiss(this.city.id, unit.name, quantity)
      .then( response => {
        this.city.updateCity(response);
        this.recalculateMaxParams();
      });
  }

  clear() {
    this.city = null;
    this.archerToRecruit = null;
    this.pikemanToRecruit = null;
    this.cavalryToRecruit = null;
    this.archerToDismiss = null;
    this.pikemanToDismiss = null;
    this.cavalryToDismiss = null;
  }


}
