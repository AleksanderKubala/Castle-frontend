import {TileDetails} from './tile-details';
import {City} from './city';

export class Tile {

  row: number;
  col: number;
  image: string;

  constructor(row: number, col: number, image: string) {
    this.row = row;
    this.col = col;
    this.image = image;
  }

  public updateImage(image: string) {
    this.image = image;
  }
}
