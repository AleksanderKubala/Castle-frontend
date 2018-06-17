import {Tile} from './tile';
import {BuildingType} from './building-type';

export class CityTile extends Tile {

  building: BuildingType;

  constructor(row: number, col: number, image: string, building: BuildingType) {
    super(row, col, image);
    this.building = building;
  }

}
