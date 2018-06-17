import {TileDetails} from './tile-details';
import {BuildingType} from './building-type';

export class Building implements TileDetails {

  type: BuildingType;

  constructor(type: BuildingType) {
    this.type = type;
  }

  getDescription(): string {
    return 'some description';
  }

}
