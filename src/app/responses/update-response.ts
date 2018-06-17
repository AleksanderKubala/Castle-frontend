import {CityResponse} from './element-responses/city-response';

export class UpdateResponse {

  cities: CityResponse[];

  constructor(cities: CityResponse[]) {
    this.cities = cities;
  }
}
