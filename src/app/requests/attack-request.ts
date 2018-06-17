import {GarrisonRequest} from './garrison-request';

export class AttackRequest {

  attackerCity: number;
  targetCity: number;
  troops: GarrisonRequest[];

  constructor(attackerCity: number, targetCity: number, troops: GarrisonRequest[]) {
    this.attackerCity = attackerCity;
    this.targetCity = targetCity;
    this.troops = troops;
  }
}
