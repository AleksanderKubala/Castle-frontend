import {ProductionResponse} from './production-response';
import {RequirementResponse} from './requirement-response';


export class BuildingTypeResponse {

  name: string;
  displayName: string;
  limit: number;
  destructible: boolean;
  mainBuilding: boolean;
  productions: ProductionResponse[];
  requirements: RequirementResponse[];

  constructor(
    name: string,
    displayName: string,
    limit: number,
    destructible: boolean,
    mainBuilding: boolean,
    productions: ProductionResponse[],
    requirements: RequirementResponse[]) {
    this.name = name;
    this.displayName = displayName;
    this.limit = limit;
    this.destructible = destructible;
    this.mainBuilding = mainBuilding;
    this.productions = productions;
    this.requirements = requirements;
  }
}
