import { Injectable } from '@angular/core';
import {AbstractExternalService} from '../../../abstract-external-service';
import {HttpClient} from '@angular/common/http';
import {EventService} from '../../../internal-services/event-service/event.service';
import {Urls} from '../../../../_config/server-urls';
import {CityTileResponse} from '../../../../responses/element-responses/city-tile-response';
import {ConstructionRequest} from '../../../../requests/construction-request';
import {CityResponse} from '../../../../responses/element-responses/city-response';

@Injectable()
export class CityManagementService extends AbstractExternalService {

  constructor(
    protected eventService: EventService,
    protected urls: Urls,
    protected http: HttpClient
  ) {
    super(eventService, urls, http);
  }

  public async postConstructtion(cityId: number, row: number, column: number, buildingType: string): Promise<CityResponse> {
    const request: ConstructionRequest = new ConstructionRequest(cityId, row, column, buildingType);
    return this.http.post<CityResponse>(this.urls.constructBuilding, request)
      .toPromise()
      .then()
      .catch(error => this.handleError(error));
  }

  public async postDestroy(cityId: number, row: number, column: number): Promise<CityResponse> {
    const request: ConstructionRequest = new ConstructionRequest(cityId, row, column, null);
    return this.http.post<CityResponse>(this.urls.destroyBuilding, request)
      .toPromise()
      .then()
      .catch(error => this.handleError(error));
  }

}
