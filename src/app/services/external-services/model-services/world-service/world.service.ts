import { Injectable } from '@angular/core';
import {AbstractExternalService} from '../../../abstract-external-service';
import {Urls} from '../../../../_config/server-urls';
import {EventService} from '../../../internal-services/event-service/event.service';
import {HttpClient} from '@angular/common/http';
import {WorldResponse} from '../../../../responses/element-responses/world-response';

@Injectable()
export class WorldService extends AbstractExternalService {

  constructor(
    protected eventService: EventService,
    protected urls: Urls,
    protected http: HttpClient
  ) {
    super(eventService, urls, http);
  }

  public async getWorld(worldNumber: number): Promise<WorldResponse> {
    return this.http.get<WorldResponse>(this.urls.world + worldNumber)
      .toPromise()
      .then()
      .catch(error => this.handleError(error));
  }
}
