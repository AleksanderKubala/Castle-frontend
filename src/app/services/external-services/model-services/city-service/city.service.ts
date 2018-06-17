import { Injectable } from '@angular/core';
import {AbstractExternalService} from '../../../abstract-external-service';
import {Urls} from '../../../../_config/server-urls';
import {EventService} from '../../../internal-services/event-service/event.service';
import {HttpClient} from '@angular/common/http';
import {CityResponse} from '../../../../responses/element-responses/city-response';

@Injectable()
export class CityService extends AbstractExternalService {

  constructor(
    protected eventService: EventService,
    protected urls: Urls,
    protected http: HttpClient
  ) {
    super(eventService, urls, http);
  }

  public async getCityDetails(id: number): Promise<CityResponse> {
    return this.http.get<CityResponse>(this.urls.city + id)
      .toPromise()
      .then()
      .catch(error => this.handleError(error));
  }

  public async getPlayerCities(username: string): Promise<CityResponse[]> {
    return this.http.get<CityResponse[]>(this.urls.playerCities +  username)
      .toPromise()
      .then()
      .catch(error => this.handleError(error));
  }

}
