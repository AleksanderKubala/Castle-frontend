export class GarrisonRequest {

  unitName: string;
  quantity: number;

  constructor(unitName: string, quantity: number) {
    this.unitName = unitName;
    this.quantity = quantity;
  }
}
