import {Tile} from './tile';
import {City} from './city';

export class WorldTile extends Tile {

  city: City;
  terrain: string;

  constructor(
    row: number,
    col: number,
    image: string,
    terrain: string,
    city: City) {
    super(row, col, image);
    this.city = city;
    this.terrain = terrain;
  }
}
