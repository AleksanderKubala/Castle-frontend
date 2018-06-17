import { Injectable } from '@angular/core';
import {AbstractExternalService} from '../../../abstract-external-service';
import {Urls} from '../../../../_config/server-urls';
import {EventService} from '../../../internal-services/event-service/event.service';
import {HttpClient} from '@angular/common/http';
import {StructureType} from '../../../../classes/structure-type';

@Injectable()
export class StructureTypeService extends AbstractExternalService {

  constructor(
    protected eventService: EventService,
    protected urls: Urls,
    protected http: HttpClient
  ) {
    super(eventService, urls, http);
  }

  public async getStructures(): Promise<StructureType[]> {
    return this.http.get<StructureType[]>(this.urls.structures)
       .toPromise()
       .then()
       .catch(error => this.handleError(error));
  }
}
