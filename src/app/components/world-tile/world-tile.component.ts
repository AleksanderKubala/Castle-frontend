import {Component, Input, OnInit} from '@angular/core';
import {AbstractTileComponent} from '../abstract-tile-component';
import {EventService} from '../../services/internal-services/event-service/event.service';
import {Event} from '../../_config/event-config';
import {isNullOrUndefined} from 'util';
import {WorldTile} from '../../classes/world-tile';
import {UserInfoService} from '../../services/internal-services/user-info-service/user-info.service';

@Component({
  selector: 'app-world-tile',
  templateUrl: './world-tile.component.html',
  styleUrls: ['./world-tile.component.scss']
})
export class WorldTileComponent extends AbstractTileComponent implements OnInit {

  @Input() tile: WorldTile;

  userInfoService: UserInfoService;

  constructor(
    eventService: EventService,
    userInfoService: UserInfoService
  ) {
    super(eventService);
    this.userInfoService = userInfoService;
  }

  ngOnInit() {
  }

  changeActiveCity(): void {
    if ( !isNullOrUndefined(this.tile.city)) {
      if ( this.userInfoService.isPlayerCity(this.tile.city)) {
        this.eventService.emit(Event.CHANGE_ACTIVE_CITY, this.tile.city);
      }
    }
  }

  showDetails(): void {
    if ( !isNullOrUndefined(this.tile.city)) {
      if (this.userInfoService.isPlayerCity(this.tile.city)) {
        this.eventService.emit(Event.CHANGE_AND_DISPLAY_ACTIVE_CITY, this.tile.city);
      } else {
        this.eventService.emit(Event.LOAD_STRUCTURE_DETAILS, this.tile);
      }
    } else {
      this.eventService.emit(Event.LOAD_STRUCTURE_DETAILS, this.tile);
    }
  }

}
