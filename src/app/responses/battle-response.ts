import {GarrisonResponse} from './element-responses/garrison-response';
import {StorageResponse} from './element-responses/storage-response';

export class BattleResponse {

  attackerCity: string;
  attacker: string;
  targetCity: string;
  target: string;
  attackerLosses: GarrisonResponse[];
  targetLosses: GarrisonResponse[];
  plunder: StorageResponse[];
  attackerWon: boolean;

  constructor(
    attackerCity: string,
    attacker: string,
    targetCity: string,
    target: string,
    attackerLosses: GarrisonResponse[],
    targetLosses: GarrisonResponse[],
    plunder: StorageResponse[],
    attackerWon: boolean
  ) {
    this.attackerCity = attackerCity;
    this.attacker = attacker;
    this.targetCity = targetCity;
    this.target = target;
    this.attackerLosses = attackerLosses;
    this.targetLosses = targetLosses;
    this.plunder = plunder;
    this.attackerWon = attackerWon;
  }
}
