import {AbstractEconomyObject} from './abstract-economy-object';

export class Unit extends AbstractEconomyObject {

  name: string;
  displayName: string;
  strength: number;
  speed: number;
  health: number;
  capacity: number;
  image: string;

  constructor (
    name: string,
    displayName: string,
    strength: number,
    speed: number,
    health: number,
    capacity: number
  ) {
    super();
    this.name = name;
    this.displayName = displayName;
    this.strength = strength;
    this.speed = speed;
    this.health = health;
    this.capacity = capacity;
  }
}
