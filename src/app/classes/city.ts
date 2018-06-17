import {TileDetails} from './tile-details';
import {Production} from './production';
import {CityResponse} from '../responses/element-responses/city-response';
import {CityStorage} from './city-storage';
import {Resource} from './resource';
import {Requirement} from './requirement';
import {isNullOrUndefined} from 'util';
import {StorageResponse} from '../responses/element-responses/storage-response';
import {ProductionResponse} from '../responses/element-responses/production-response';
import {GarrisonResponse} from '../responses/element-responses/garrison-response';
import {Garrison} from './garrison';
import {ImageMapperService} from '../services/internal-services/image-mapper-service/image-mapper.service';
import {Unit} from './unit';
import {AbstractStrategicObject} from './abstract-strategic-object';

export class City extends AbstractStrategicObject implements TileDetails {

  id: number;
  name: string;
  rowsNumber: number;
  colsNumber: number;
  capital: boolean;
  owner: string;
  hasMainBuilding: boolean;
  hasArchery: boolean;
  hasBarracks: boolean;
  hasStables: boolean;

  constructor(cityResponse: CityResponse) {
    super();
    this.id = cityResponse.id;
    this.capital = cityResponse.capital;
    this.colsNumber = cityResponse.columns;
    this.rowsNumber = cityResponse.rows;
    this.name = cityResponse.name;
    this.owner = cityResponse.owner;
    this.hasMainBuilding = cityResponse.hasMainBuilding;
    this.hasArchery = cityResponse.hasArchery;
    this.hasBarracks = cityResponse.hasBarracks;
    this.hasStables = cityResponse.hasStables;
  }

  getDescription(): string {
    return 'some description';
  }


  public canRecruit(unit: Unit) {
    if (unit.name === 'archer') {
      return !this.hasArchery;
    } else if (unit.name === 'pikeman') {
      return !this.hasBarracks;
    } else if (unit.name === 'cavalry') {
      return !this.hasStables;
    } else {
      return false;
    }
  }

  public updateCity(response: CityResponse) {
    this.name = response.name;
    this.capital = response.capital;
    this.owner = response.owner;
    this.hasMainBuilding = response.hasMainBuilding;
    this.hasArchery = response.hasArchery;
    this.hasBarracks = response.hasBarracks;
    this.hasStables = response.hasStables;
    this.updateGarrison(response.garrison);
    this.updateProduction(response.productions);
    this.updateStorage(response.storage);
  }

}
