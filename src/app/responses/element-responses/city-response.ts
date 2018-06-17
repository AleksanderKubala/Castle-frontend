import {CityTileResponse} from './city-tile-response';
import {Production} from '../../classes/production';
import {ProductionResponse} from './production-response';
import {StorageResponse} from './storage-response';
import {GarrisonResponse} from './garrison-response';

export class CityResponse {

  id: number;
  name: string;
  rows: number;
  columns: number;
  capital: boolean;
  owner: string;
  hasMainBuilding: boolean;
  hasArchery: boolean;
  hasBarracks: boolean;
  hasStables: boolean;
  productions: ProductionResponse[];
  storage: StorageResponse[];
  garrison: GarrisonResponse[];
  tiles: CityTileResponse[];

  constructor(id: number,
              name: string,
              rows: number,
              columns: number,
              capital: boolean,
              owner: string,
              hasMainBuilding: boolean,
              hasArchery: boolean,
              hasBarracks: boolean,
              hasStables: boolean,
              productions: ProductionResponse[],
              storage: StorageResponse[],
              garrison: GarrisonResponse[],
              tiles: CityTileResponse[]) {
    this.id = id;
    this.name = name;
    this.rows = rows;
    this.columns = columns;
    this.capital = capital;
    this.owner = owner;
    this.hasMainBuilding = hasMainBuilding;
    this.hasArchery = hasArchery;
    this.hasBarracks = hasBarracks;
    this.hasStables = hasStables;
    this.productions = productions;
    this.storage = storage;
    this.garrison = garrison;
    this.tiles = tiles;
  }
}
