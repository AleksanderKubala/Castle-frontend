import {Resource} from './resource';

export class Requirement {

  resource: Resource;
  quantity: number;

  constructor(resource: Resource, quantity: number) {
    this.resource = resource;
    this.quantity = quantity;
  }
}
