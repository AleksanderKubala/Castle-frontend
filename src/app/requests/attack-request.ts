import {GarrisonRequest} from './garrison-request';

export class AttackRequest {

  attackerCity: number;
  targetCity: number;
  troops: GarrisonRequest[];
  plunder: string[];

  constructor(
    attackerCity: number,
    targetCity: number,
    troops: GarrisonRequest[],
    plunder: string[]
    ) {
    this.attackerCity = attackerCity;
    this.targetCity = targetCity;
    this.troops = troops;
    this.plunder = plunder;
  }
}
