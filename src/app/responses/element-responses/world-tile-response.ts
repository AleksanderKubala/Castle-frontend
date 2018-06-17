import {CityResponse} from './city-response';

export class WorldTileResponse {

  row: number;
  column: number;
  terrain: string;
  structureType: string;
  city: CityResponse;

  constructor(row: number, column: number, terrain: string, structureType: string, city: CityResponse) {
    this.row = row;
    this.column = column;
    this.structureType = structureType;
    this.terrain = terrain;
    this.city = city;
  }
}
