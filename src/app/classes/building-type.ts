import {AbstractEconomyObject} from './abstract-economy-object';

export class BuildingType extends AbstractEconomyObject {

  name: string;
  displayName: string;
  limit: number;
  destructible: boolean;
  mainBuilding: boolean;

  constructor(
    name: string,
    displayName: string,
    limit: number,
    destructible: boolean,
    mainBuilding: boolean) {
    super();
    this.name = name;
    this.displayName = displayName;
    this.limit = limit;
    this.destructible = destructible;
    this.mainBuilding = mainBuilding;
  }

}
