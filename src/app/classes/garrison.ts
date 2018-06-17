import {Unit} from './unit';
import {GarrisonResponse} from '../responses/element-responses/garrison-response';

export class Garrison {

  unit: Unit;
  quantity: number;

  constructor(unit: Unit, quantity: number) {
    this.unit = unit;
    this.quantity = quantity;
  }
}
