import {RequirementResponse} from './requirement-response';
import {ProductionResponse} from './production-response';

export class UnitResponse {

  name: string;
  displayName: string;
  strength: number;
  speed: number;
  health: number;
  capacity: number;
  requirements: RequirementResponse[];
  productions: ProductionResponse[];

  constructor (
    name: string,
    displayName: string,
    strength: number,
    speed: number,
    health: number,
    capacity: number,
    requirements: RequirementResponse[],
    productions: ProductionResponse[],
  ) {
    this.name = name;
    this.displayName = displayName;
    this.strength = strength;
    this.speed = speed;
    this.health = health;
    this.capacity = capacity;
    this.requirements = requirements;
    this.productions = productions;
  }
}
