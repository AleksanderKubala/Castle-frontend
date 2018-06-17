import {GarrisonResponse} from './element-responses/garrison-response';

export class BattleResponse {

  attackerCity: string;
  attacker: string;
  targeCity: string;
  target: string;
  attackerLosses: GarrisonResponse[];
  targetLosses: GarrisonResponse[];
  attackerWon: boolean;

  constructor(
    attackerCity: string,
    attacker: string,
    targetCity: string,
    target: string,
    attackerLosses: GarrisonResponse[],
    taregtLosses: GarrisonResponse[],
    attackerWon: boolean
  ) {
    this.attackerCity = attackerCity;
    this.attacker = attacker;
    this.targeCity = targetCity;
    this.target = target;
    this.attackerLosses = attackerLosses;
    this.targetLosses = taregtLosses;
    this.attackerWon = attackerWon;
  }
}
