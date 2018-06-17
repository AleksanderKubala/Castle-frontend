import { Injectable } from '@angular/core';
import {AbstractExternalService} from '../../../abstract-external-service';
import {Urls} from '../../../../_config/server-urls';
import {HttpClient} from '@angular/common/http';
import {EventService} from '../../../internal-services/event-service/event.service';
import {CityResponse} from '../../../../responses/element-responses/city-response';
import {GarrisonRequest} from '../../../../requests/garrison-request';

@Injectable()
export class RecruitmentService extends AbstractExternalService {

  constructor(
    protected eventService: EventService,
    protected urls: Urls,
    protected http: HttpClient
  ) {
    super(eventService, urls, http);
  }

  public async recruit(cityId: number, unitName: string, quantity: number): Promise<CityResponse> {
    return this.http.post<CityResponse>(
      this.urls.recruitUnit + cityId,
      {unitName, quantity} as GarrisonRequest
    )
      .toPromise()
      .then()
      .catch(error => this.handleError(error));
  }

  public async dismiss(cityId: number, unitName: string, quantity: number): Promise<CityResponse> {
    return this.http.post<CityResponse>(
      this.urls.dismissUnit + cityId,
      {unitName, quantity} as GarrisonRequest
    )
      .toPromise()
      .then()
      .catch(error => this.handleError(error));
  }
}
