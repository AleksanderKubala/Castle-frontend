import { Injectable } from '@angular/core';
import {AbstractExternalService} from '../../../abstract-external-service';
import {HttpClient} from '@angular/common/http';
import {EventService} from '../../../internal-services/event-service/event.service';
import {Urls} from '../../../../_config/server-urls';
import {CityResponse} from '../../../../responses/element-responses/city-response';
import {Observable, Observer, Subject} from 'rxjs';
import {AbstractService} from '../../../abstract-service';
import {WebsocketService} from '../websocket-service/websocket.service';
import {UpdateResponse} from '../../../../responses/update-response';


@Injectable()
export class UpdateService extends AbstractService {

  public messages: Subject<UpdateResponse>;

  constructor(eventService: EventService,
              wsService: WebsocketService) {
    super(eventService);
    /*
    this.messages = <Subject<UpdateResponse>>wsService
      .connect()
      .toPromise()
      .then();
      */
  }
}
