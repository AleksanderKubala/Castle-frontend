import { Injectable } from '@angular/core';
import {AbstractExternalService} from '../../../abstract-external-service';
import {HttpClient} from '@angular/common/http';
import {EventService} from '../../../internal-services/event-service/event.service';
import {Urls} from '../../../../_config/server-urls';
import {Unit} from '../../../../classes/unit';
import {UnitResponse} from '../../../../responses/element-responses/unit-response';

@Injectable()
export class UnitService extends AbstractExternalService {

  constructor(
    protected eventService: EventService,
    protected urls: Urls,
    protected http: HttpClient
  ) {
    super(eventService, urls, http);
  }

  public async getUnits(): Promise<UnitResponse[]> {
    return this.http.get<UnitResponse[]>(this.urls.units)
      .toPromise()
      .then()
      .catch(error => this.handleError(error));
  }
}
