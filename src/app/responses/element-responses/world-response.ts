import {WorldTileResponse} from './world-tile-response';

export class WorldResponse {

  id: number;
  name: string;
  rows: number;
  columns: number;
  tiles: WorldTileResponse[];

  constructor(id: number, name: string, rows: number, columns: number, tiles: WorldTileResponse[]) {
    this.id = id;
    this.name = name;
    this.rows = rows;
    this.columns = columns;
    this.tiles = tiles;
  }
}
