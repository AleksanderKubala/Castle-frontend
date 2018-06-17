import { Injectable } from '@angular/core';
import {AbstractExternalService} from '../../../abstract-external-service';
import {HttpClient} from '@angular/common/http';
import {Urls} from '../../../../_config/server-urls';
import {EventService} from '../../../internal-services/event-service/event.service';
import {Resource} from '../../../../classes/resource';

@Injectable()
export class ResourceService extends AbstractExternalService {

  constructor(
    protected eventService: EventService,
    protected urls: Urls,
    protected http: HttpClient
  ) {
    super(eventService, urls, http);
  }

  public async getResources(): Promise<Resource[]> {
    return this.http.get<Resource[]>(this.urls.resources)
      .toPromise()
      .then()
      .catch(error => this.handleError(error));
  }
}
