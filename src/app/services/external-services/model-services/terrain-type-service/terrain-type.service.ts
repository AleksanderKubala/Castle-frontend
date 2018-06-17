import { Injectable } from '@angular/core';
import {AbstractExternalService} from '../../../abstract-external-service';
import {Urls} from '../../../../_config/server-urls';
import {EventService} from '../../../internal-services/event-service/event.service';
import {HttpClient} from '@angular/common/http';
import {TerrainType} from '../../../../classes/terrain-type';

@Injectable()
export class TerrainService extends AbstractExternalService {

  constructor(
    protected eventService: EventService,
    protected urls: Urls,
    protected http: HttpClient
  ) {
    super(eventService, urls, http);
  }

  public async getTerrains(): Promise<TerrainType[]> {
    return this.http.get<TerrainType[]>(this.urls.terrains)
      .toPromise()
      .then()
      .catch(error => this.handleError(error));
  }
}
