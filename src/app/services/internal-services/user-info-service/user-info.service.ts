import { Injectable } from '@angular/core';
import {AbstractService} from '../../abstract-service';
import {EventService} from '../event-service/event.service';
import {CityService} from '../../external-services/model-services/city-service/city.service';
import {City} from '../../../classes/city';
import {Event} from '../../../_config/event-config';
import {CityStorage} from '../../../classes/city-storage';
import {Production} from '../../../classes/production';
import {ImageMapperService} from '../image-mapper-service/image-mapper.service';
import {CityResponse} from '../../../responses/element-responses/city-response';
import {UpdateResponse} from '../../../responses/update-response';

@Injectable()
export class UserInfoService extends AbstractService {

  cityService: CityService;
  imageService: ImageMapperService;

  playerCities: City[];
  activeCity: City;
  username: string;
  worldNumber: number;

  constructor(
    eventService: EventService,
    cityService: CityService,
    imageService: ImageMapperService) {
    super(eventService);
    this.cityService = cityService;
    this.imageService = imageService;
    this.eventService.on(Event.LOGGED_IN, this.onLogIn, this);
    this.eventService.on(Event.CHANGE_ACTIVE_CITY, this.onChangeActiveCity, this);
    this.eventService.on(Event.CHANGE_AND_DISPLAY_ACTIVE_CITY, this.onChangeAndDisplayActiveCity, this);
    this.eventService.on(Event.LOGGED_OUT, this.onLogOut, this);
    this.eventService.on(Event.STORAGE_UPDATE, this.onStorageUpdate, this);
  }

  public getUsername() {
    return this.username;
  }

  public getActiveCity() {
    return this.activeCity;
  }

  public getWorldNumber(): number {
    return this.worldNumber;
  }

  public addNewPlayerCity(cityResponse: CityResponse): City {
    const city = new City(cityResponse);
    city.fillStorage(this.imageService, cityResponse.storage);
    city.fillProduction(this.imageService, cityResponse.productions);
    city.fillGarrison(this.imageService, cityResponse.garrison);
    if (cityResponse.capital) {
      this.activeCity = city;
    }
    this.playerCities.push(city);
    return city;
  }

  public getPlayerCity(cityId: number): City {
    for (let i = 0; i < this.playerCities.length; i++) {
      if (this.playerCities[i].id === cityId) {
        return this.playerCities[i];
      }
    }
    return null;
  }

  onLogIn(args: any) {
    this.username = args[0];
    this.worldNumber = args[1];
    this.cityService.getPlayerCities(this.username).then(response => {
      this.playerCities = [];
      for (let i = 0; i < response.length; i++) {
        this.addNewPlayerCity(response[i]);
      }
      this.eventService.emit(Event.LOAD_CITY, this.activeCity);
      this.eventService.emit(Event.LOAD_WORLD, this.worldNumber);
    });
  }

  onLogOut() {
    this.playerCities = null;
    this.activeCity = null;
    this.username = null;
    this.worldNumber = null;
  }

  onChangeActiveCity(city: City) {
    if (this.activeCity !== city[0]) {
      this.activeCity = city[0];
      this.eventService.emit(Event.ACTIVE_CITY_CHANGED, this.activeCity);
      this.eventService.emit(Event.LOAD_CITY, this.activeCity);
    }
    /*
    if (this.activeCity !== city[0]) {
      const found = this.isPlayerCity(city[0]);
      if (found) {
        this.activeCity = city;
        this.eventService.emit(Event.ACTIVE_CITY_CHANGED, this.activeCity);
      }
      return found;
    } else {
      return true;
    }
    */
  }

  onChangeAndDisplayActiveCity(city: City) {
    this.onChangeActiveCity(city);
    this.eventService.emit(Event.DISPLAY_CITY);
    // this.eventService.emit(Event.LOAD_CITY, this.activeCity);
    /*
    const found = this.onChangeActiveCity(city);
    if (found) {
      this.eventService.emit(Event.LOAD_CITY, this.activeCity);
    }
    */
  }

  public isPlayerCity(city: City): boolean {
    let found = false;
    for (let i = 0; (i < this.playerCities.length) && (!found); i++) {
      if (this.playerCities[i] === city) {
        found = true;
      }
    }
    return found;
  }

  private onStorageUpdate(update: UpdateResponse) {
     const updates = update[0].cities;
    for (let i = 0; i < this.playerCities.length; i++) {
      const playerCity = this.playerCities[i];
      for (let j = 0; j < updates.length; j++) {
        if (updates[j].id === playerCity.id) {
          playerCity.updateCity(updates[j]);
        }
      }
    }
  }



}
