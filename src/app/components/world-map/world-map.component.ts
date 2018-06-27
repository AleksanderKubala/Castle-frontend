import { Component, OnInit } from '@angular/core';
import {EventService} from '../../services/internal-services/event-service/event.service';
import {ImageMapperService} from '../../services/internal-services/image-mapper-service/image-mapper.service';
import {WorldService} from '../../services/external-services/model-services/world-service/world.service';
import {Event} from '../../_config/event-config';
import {WorldTile} from '../../classes/world-tile';
import {City} from '../../classes/city';
import {isNullOrUndefined} from 'util';
import {UserInfoService} from '../../services/internal-services/user-info-service/user-info.service';
import {Production} from '../../classes/production';
import {CityStorage} from '../../classes/city-storage';
import {UpdateService} from '../../services/external-services/game-services/update-service/update.service';
import {CityResponse} from '../../responses/element-responses/city-response';
import {StorageResponse} from '../../responses/element-responses/storage-response';
import {WorldTileResponse} from '../../responses/element-responses/world-tile-response';


@Component({
  selector: 'app-world-map',
  templateUrl: './world-map.component.html',
  styleUrls: ['./world-map.component.scss']
})
export class WorldMapComponent implements OnInit {

  eventService: EventService;
  imageService: ImageMapperService;
  worldService: WorldService;
  userInfoService: UserInfoService;

  worldName: string;
  worldNumber: number;
  rows: number;
  columns: number;
  tiles: WorldTile[];
  cities: City[];

  constructor(
    eventService: EventService,
    imageService: ImageMapperService,
    worldService: WorldService,
    userInfoService: UserInfoService) {
    this.eventService = eventService;
    this.imageService = imageService;
    this.worldService = worldService;
    this.userInfoService = userInfoService;
  }

  ngOnInit() {
    this.eventService.on(Event.LOAD_WORLD, this.onLoadWorld, this);
   //  this.eventService.on(Event.STORAGE_UPDATE, this.onStorageUpdate, this);
    this.eventService.on(Event.ACTIVE_CITY_CHANGED, this.onActiveCityChanged, this);
    this.eventService.on(Event.NEW_CITY_BUILT, this.onNewCityBuilt, this);
    this.eventService.on(Event.LOGGED_OUT, this.onLogOut, this);
  }

  onLoadWorld(worldNumber: number) {
    const username = this.userInfoService.getUsername();
    this.worldService.getWorld(worldNumber).then(response => {
      this.tiles = [];
      this.cities = [];
      this.worldName = response.name;
      this.worldNumber = response.id;
      this.rows = response.rows;
      this.columns = response.columns;
      for (let i = 0; i < response.tiles.length; i++) {
        const tileResponse = response.tiles[i];
        let playerOwned: boolean;
        let city: City;
        let image: string;
        if (!isNullOrUndefined(tileResponse.city)) {
          if (tileResponse.city.owner === username) {
            city = this.userInfoService.getPlayerCity(tileResponse.city.id);
            playerOwned = true;
          } else {
            city = new City(tileResponse.city);
            city.fillStorage(this.imageService, tileResponse.city.storage);
            city.fillProduction(this.imageService, tileResponse.city.productions);
            city.fillGarrison(this.imageService, tileResponse.city.garrison);
            playerOwned = false;
          }
          this.cities.push(city);
          image = this.imageService.createStructureImageString(tileResponse.terrain, tileResponse.structureType, playerOwned);
        } else {
          image = this.imageService.createImageString(tileResponse.terrain, tileResponse.structureType);
        }
        this.tiles[i] = new WorldTile(tileResponse.row, tileResponse.column, image, tileResponse.terrain, city);
      }
    });
  }

  onNewCityBuilt(tileResponse: WorldTileResponse) {
    const tile = tileResponse[0];
    const city = this.userInfoService.addNewPlayerCity(tile.city);
    const image = this.imageService.createStructureImageString(tile.terrain, tile.structureType, true);
    const worldTile = this.tiles[tile.row * this.columns + tile.column];
    worldTile.city = city;
    worldTile.updateImage(image);
    this.eventService.emit(Event.DISPLAY_WORLD);
  }

  onLogOut() {
    this.cities = [];
    this.tiles = [];
  }

  displayCity(): void {
    this.eventService.emit(Event.DISPLAY_CITY);
  }

  /*
  onStorageUpdate(update: CityResponse[]) {
    if (!isNullOrUndefined(this.cities)) {
      for (let i = 0; i < this.cities.length; i++) {
        for (let j = 0; j < update.length; j++) {
          if (this.cities[i].id === update[j].id) {
            this.cities[i].updateStorage(update[j].storage);
          }
        }
      }
    }
  }
*/

  onActiveCityChanged(city: City) {

  }
}
