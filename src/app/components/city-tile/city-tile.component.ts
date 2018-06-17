import {Component, Input, OnInit} from '@angular/core';
import {EventService} from '../../services/internal-services/event-service/event.service';
import {AbstractTileComponent} from '../abstract-tile-component';
import {CityTile} from '../../classes/city-tile';
import {Event} from '../../_config/event-config';

@Component({
  selector: 'app-city-tile',
  templateUrl: './city-tile.component.html',
  styleUrls: ['./city-tile.component.scss']
})
export class CityTileComponent extends AbstractTileComponent implements OnInit {

  @Input() tile: CityTile;

  constructor(eventService: EventService) {
    super(eventService);
  }

  ngOnInit() {
  }

  tileChosen() {
    this.eventService.emit(Event.CITY_TILE_SELECTED, this.tile);
  }

}
