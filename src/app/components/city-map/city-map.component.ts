import { Component, OnInit } from '@angular/core';
import {EventService} from '../../services/internal-services/event-service/event.service';
import {ImageMapperService} from '../../services/internal-services/image-mapper-service/image-mapper.service';
import {CityService} from '../../services/external-services/model-services/city-service/city.service';
import {City} from '../../classes/city';
import {Event} from '../../_config/event-config';
import {CityTile} from '../../classes/city-tile';
import {BuildingType} from '../../classes/building-type';
import {CityManagementService} from '../../services/external-services/game-services/city-management/city-management.service';
import {isNullOrUndefined} from 'util';
import {CityTileResponse} from '../../responses/element-responses/city-tile-response';
import {CityResponse} from '../../responses/element-responses/city-response';
import {updateSourceFile} from '@angular/compiler-cli/src/transformers/node_emitter';
import {Resource} from '../../classes/resource';

@Component({
  selector: 'app-city-map',
  templateUrl: './city-map.component.html',
  styleUrls: ['./city-map.component.scss']
})

export class CityMapComponent implements OnInit {

  eventService: EventService;
  imageService: ImageMapperService;
  cityService: CityService;
  cityManagement: CityManagementService;

  tiles: CityTile[];

  displayedCity: City;

  selectedBuilding: BuildingType;
  action: ActionType;

  constructor(
    eventService: EventService,
    imageService: ImageMapperService,
    cityService: CityService,
    cityManagement: CityManagementService) {
    this.eventService = eventService;
    this.imageService = imageService;
    this.cityService = cityService;
    this.cityManagement = cityManagement;
    this.action = ActionType.INSPECT;
  }

  ngOnInit() {
    this.eventService.on(Event.LOAD_CITY, this.onLoadCity, this);
    this.eventService.on(Event.CITY_TILE_SELECTED, this.onTileSelected, this);
    this.eventService.on(Event.LOGGED_OUT, this.onLogOut, this);
  }

  displayWorld(): void {
    this.eventService.emit(Event.DISPLAY_WORLD);
  }

  onLoadCity(city: City): void {
    if ((isNullOrUndefined(this.displayedCity)) || (this.displayedCity.id !== city[0].id)) {
      this.displayedCity = city[0];
      this.cityService.getCityDetails(this.displayedCity.id).then(details => {
        this.tiles = [];
        for (let i = 0; i < details.tiles.length; i++) {
          const tileResponse = details.tiles[i];
          const image = this.imageService.createImageString(tileResponse.terrain, tileResponse.building);
          const building = this.imageService.getBuildingTypeByName(tileResponse.building);
          this.tiles[i] = new CityTile(tileResponse.row, tileResponse.column, image, building);
        }
        // this.eventService.emit(Event.DISPLAY_CITY);
      });
      /* } else {
        this.eventService.emit(Event.DISPLAY_CITY);
      } */
    }
  }

  onLogOut() {
    this.displayedCity = null;
    this.tiles = [];
    this.selectedBuilding = null;
    this.action = ActionType.INSPECT;
  }

  selectConstruct(building: BuildingType) {
    this.action = ActionType.CONSTRUCT;
    this.selectedBuilding = building;
  }

  selectDestroy() {
    this.action = ActionType.DESTROY;
  }

  selectInspect() {
    this.action = ActionType.INSPECT;
  }

  onTileSelected(selectedTile: CityTile) {
    const tile = selectedTile[0];
    if (this.action === ActionType.CONSTRUCT) {
      this.construct(tile);
    } else if (this.action === ActionType.DESTROY) {
        this.destroy(tile);
    } else if (this.action === ActionType.INSPECT) {
      if (tile.building.mainBuilding) {
        this.eventService.emit(Event.LOAD_CASTLE);
      }
    }
  }

  construct(tile: CityTile) {
    if (isNullOrUndefined(tile.building)) {
      const reqMet = this.displayedCity.checkForRequirementsMet(this.selectedBuilding.getRequirements());
      if (reqMet) {
          this.cityManagement.postConstructtion(
            this.displayedCity.id,
            tile.row,
            tile.col,
            this.selectedBuilding.name).then(response => this.updateTile(tile, response));
      }
    }
  }

  destroy(tile: CityTile) {
    if (!isNullOrUndefined(tile.building)) {
      if (tile.building.destructible) {
        this.cityManagement.postDestroy(this.displayedCity.id, tile.row, tile.col).then(response => this.updateTile(tile, response));
      }
    }
  }

  updateTile (tile: CityTile, response: CityResponse): void {
    const image = this.imageService.createImageString(response.tiles[0].terrain, response.tiles[0].building);
    tile.updateImage(image);
    tile.building = this.imageService.getBuildingTypeByName(response.tiles[0].building);
    this.displayedCity.updateCity(response);
  }

}

enum ActionType {
  CONSTRUCT = 'Construct',
  DESTROY = 'Destroy',
  INSPECT = 'Inspect'
}
