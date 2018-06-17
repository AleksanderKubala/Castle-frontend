import {Resource} from './resource';

export class Production {

  resource: Resource;
  quantity: number;

  constructor(resource: Resource, quantity: number) {
    this.resource = resource;
    this.quantity = quantity;
  }
}
