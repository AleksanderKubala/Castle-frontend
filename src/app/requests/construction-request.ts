export class ConstructionRequest {

  cityId: number;
  row: number;
  column: number;
  buildingType: string;

  constructor(cityId: number, row: number, column: number, buildingType: string) {
    this.cityId = cityId;
    this.row = row;
    this.column = column;
    this.buildingType = buildingType;
  }
}
