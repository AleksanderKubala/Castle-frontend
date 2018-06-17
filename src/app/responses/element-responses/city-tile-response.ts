export class CityTileResponse {

  cityId: number;
  row: number;
  column: number;
  terrain: string;
  building: string;

  constructor(cityId: number, row: number, column: number, terrain: string, building: string) {
    this.cityId = cityId;
    this.row = row;
    this.column = column;
    this.building = building;
    this.terrain = terrain;
  }
}
