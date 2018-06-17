import {CityResponse} from './element-responses/city-response';
import {GarrisonResponse} from './element-responses/garrison-response';
import {WorldTileResponse} from './element-responses/world-tile-response';

export class SettlementResponse {
  tile: WorldTileResponse;
  sourceCityGarrison: GarrisonResponse[];

  constructor (
    tile: WorldTileResponse,
    sourceCitygarrison: GarrisonResponse[]
  ) {
    this.tile = tile;
    this.sourceCityGarrison = sourceCitygarrison;
  }
}
