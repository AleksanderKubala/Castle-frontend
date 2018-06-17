import { Injectable } from '@angular/core';
import {AbstractExternalService} from '../../../abstract-external-service';
import {EventService} from '../../../internal-services/event-service/event.service';
import {HttpClient} from '@angular/common/http';
import {Urls} from '../../../../_config/server-urls';
import {BuildingType} from '../../../../classes/building-type';
import {BuildingTypeResponse} from '../../../../responses/element-responses/building-type-response';

@Injectable()
export class BuildingTypeService extends AbstractExternalService {

  constructor(
    protected eventService: EventService,
    protected urls: Urls,
    protected http: HttpClient
  ) {
    super(eventService, urls, http);
  }

  public async getBuildings(): Promise<BuildingTypeResponse[]> {
    return this.http.get<BuildingTypeResponse[]>(this.urls.buildings)
      .toPromise()
      .then()
      .catch(error => this.handleError(error));
  }
}
