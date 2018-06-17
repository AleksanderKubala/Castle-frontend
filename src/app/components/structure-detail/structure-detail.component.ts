import { Component, OnInit } from '@angular/core';
import {EventService} from '../../services/internal-services/event-service/event.service';
import {UserInfoService} from '../../services/internal-services/user-info-service/user-info.service';
import {ImageMapperService} from '../../services/internal-services/image-mapper-service/image-mapper.service';
import {City} from '../../classes/city';
import {Unit} from '../../classes/unit';
import {Event} from '../../_config/event-config';
import {Garrison} from '../../classes/garrison';
import {BattleResponse} from '../../responses/battle-response';
import {BattleService} from '../../services/external-services/game-services/battle-service/battle.service';
import {CityService} from '../../services/external-services/model-services/city-service/city.service';
import {WorldTile} from '../../classes/world-tile';
import {isNullOrUndefined} from 'util';
import {SettlementService} from '../../services/external-services/game-services/settlement-service/settlement.service';
import {SettlementResponse} from '../../responses/settlement-response';

@Component({
  selector: 'app-structure-detail',
  templateUrl: './structure-detail.component.html',
  styleUrls: ['./structure-detail.component.scss']
})
export class StructureDetailComponent implements OnInit {

  eventService: EventService;
  userInfoService: UserInfoService;
  imageService: ImageMapperService;
  battleService: BattleService;
  cityService: CityService;
  settlementService: SettlementService;

  archerToDelegate: number;
  pikemanToDelegate: number;
  cavalryToDelegate: number;

  maxDelegate: { [key: string]: number };

  city: City;
  viewedTile: WorldTile;

  archer: Unit;
  pikeman: Unit;
  cavalry: Unit;
  settler: Unit;

  lastBattleReport: BattleResponse;

  unitsLoaded: boolean;

  constructor(
    eventService: EventService,
    userInfoService: UserInfoService,
    imageService: ImageMapperService,
    battleService: BattleService,
    cityService: CityService,
    settlementService: SettlementService
  ) {
    this.eventService = eventService;
    this.userInfoService = userInfoService;
    this.imageService = imageService;
    this.battleService = battleService;
    this.cityService = cityService;
    this.settlementService = settlementService;
  }

  ngOnInit() {
    this.eventService.on(Event.LOAD_STRUCTURE_DETAILS, this.onLoadStructure, this);
    this.eventService.on(Event.LOGGED_OUT, this.onLogOut, this);
    this.unitsLoaded = false;
    this.archerToDelegate = 0;
    this.pikemanToDelegate = 0;
    this.cavalryToDelegate = 0;
    this.maxDelegate = {};
  }

  onLoadStructure(tile: WorldTile) {
    if (!this.unitsLoaded) {
      this.getUnits();
      this.unitsLoaded = true;
    }
    this.city = this.userInfoService.getActiveCity();
    this.maxDelegates();
    this.viewedTile = tile[0];
    this.eventService.emit(Event.DISPLAY_STRUCTURE_DETAILS);
  }

  onLogOut() {
    this.viewedTile = null;
    this.city = null;
    this.archerToDelegate = null;
    this.pikemanToDelegate = null;
    this.cavalryToDelegate = null;
    this.lastBattleReport = null;
  }

  getUnits() {
    this.archer = this.imageService.getUnitByName('archer');
    this.pikeman = this.imageService.getUnitByName('pikeman');
    this.cavalry = this.imageService.getUnitByName('cavalry');
    this.settler = this.imageService.getUnitByName('settler');
  }

  maxDelegates() {
    this.maxDelegate[this.archer.name] = this.city.getGarrisonByUnit(this.archer);
    this.maxDelegate[this.pikeman.name] = this.city.getGarrisonByUnit(this.pikeman);
    this.maxDelegate[this.cavalry.name] = this.city.getGarrisonByUnit(this.cavalry);
    this.maxDelegate[this.settler.name] = this.city.getGarrisonByUnit(this.settler);
  }

  displayWorld(): void {
    this.eventService.emit(Event.DISPLAY_WORLD);
  }

  attack(archers: number, pikemen: number, cavalry: number): void {
    if (this.canAttack()) {
      archers = archers > this.maxDelegate[this.archer.name] ? this.maxDelegate[this.archer.name] : archers;
      pikemen = pikemen > this.maxDelegate[this.pikeman.name] ? this.maxDelegate[this.pikeman.name] : pikemen;
      cavalry = cavalry > this.maxDelegate[this.cavalry.name] ? this.maxDelegate[this.cavalry.name] : cavalry;
      const troops: Garrison[] = [];
      if (archers > 0) {
        troops.push(new Garrison(this.archer, archers));
      }
      if (pikemen > 0) {
        troops.push(new Garrison(this.pikeman, pikemen));
      }
      if (cavalry > 0) {
        troops.push(new Garrison(this.cavalry, cavalry));
      }
      this.battleService.attack(this.city.id, this.viewedTile.city.id, troops)
        .then(response => this.showBattleResults(response));
    }
  }

  settle(): void {
    this.settlementService.settle(
      this.userInfoService.worldNumber,
      this.userInfoService.username,
      this.city.id,
      this.viewedTile.row,
      this.viewedTile.col
    ).then(response => this.setUpNewCity(response));
  }

  setUpNewCity(settlement: SettlementResponse) {
    this.city.updateGarrison(settlement.sourceCityGarrison);
    // this.viewedTile = null;
    this.eventService.emit(Event.NEW_CITY_BUILT, settlement.tile);
  }

  showBattleResults(report: BattleResponse) {
    this.lastBattleReport = report;
    this.archerToDelegate = 0;
    this.pikemanToDelegate = 0;
    this.cavalryToDelegate = 0;
    this.cityService.getCityDetails(this.city.id).then(response => {
      this.city.updateCity(response);
      this.maxDelegates();
    });
    this.cityService.getCityDetails(this.viewedTile.city.id).then(response => this.viewedTile.city.updateCity(response));
  }

  battleResult(): string {
    if (this.lastBattleReport.attackerWon) {
      return 'You won!';
    } else {
      return 'You lost!';
    }
  }

  canSettle(): boolean {
    if (!isNullOrUndefined(this.viewedTile.city)) {
      return false;
    }
    if (this.maxDelegate[this.settler.name] <= 0) {
      return false;
    }
    return true;
  }

  canAttack(): boolean {
    if (isNullOrUndefined(this.viewedTile.city)) {
      return false;
    }
    /*
    this.archerToDelegate = this.archerToDelegate < 0 ?
      (this.archerToDelegate = 0) :
      (this.archerToDelegate > this.maxDelegate[this.archer.name] ?
        this.maxDelegate[this.archer.name] : this.archerToDelegate);
    this.pikemanToDelegate = this.pikemanToDelegate < 0 ?
      (this.pikemanToDelegate = 0) :
      (this.pikemanToDelegate > this.maxDelegate[this.pikeman.name] ?
        this.maxDelegate[this.pikeman.name] : this.pikemanToDelegate);
    this.cavalryToDelegate = this.cavalryToDelegate < 0 ?
      (this.cavalryToDelegate = 0) :
      (this.cavalryToDelegate > this.maxDelegate[this.cavalry.name] ?
        this.maxDelegate[this.cavalry.name] : this.cavalryToDelegate);
        */
    if (
      (this.archerToDelegate <= 0 ) &&
      (this.pikemanToDelegate <= 0 ) &&
      (this.cavalryToDelegate <= 0 )
    ) {
      return false;
    }

    if (
      (this.archerToDelegate > this.maxDelegate[this.archer.name]) ||
      (this.pikemanToDelegate > this.maxDelegate[this.pikeman.name]) ||
      (this.cavalryToDelegate > this.maxDelegate[this.cavalry.name])
    ) {
      return false;
    }

    return true;
  }

}
