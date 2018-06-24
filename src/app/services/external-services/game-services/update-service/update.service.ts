import { Injectable } from '@angular/core';
import {AbstractExternalService} from '../../../abstract-external-service';
import {HttpClient} from '@angular/common/http';
import {EventService} from '../../../internal-services/event-service/event.service';
import {Urls} from '../../../../_config/server-urls';
import {CityResponse} from '../../../../responses/element-responses/city-response';
import {Observable, Observer, Subject} from 'rxjs';
import {AbstractService} from '../../../abstract-service';
 import * as Stomp from '@stomp/stompjs';
 import * as SockJS from '../../../../../../node_modules/sockjs-client';

import * as socketIo from '../../../../../../node_modules/socket.io-client';

@Injectable()
export class UpdateService extends AbstractExternalService {

  stompClient;

  constructor(
    protected eventService: EventService,
    protected urls: Urls,
    protected http: HttpClient
  ) {
    super(eventService, urls, http);
    const ws = new SockJS(urls.socket);
    this.stompClient = Stomp.over(ws);
    this.stompClient.connect({}, function() {
      this.stompClient.subscribe('/update', (message) => {
        if (message.body) {
          this.update(message);
        }
      });
    });
  }

  private update(update: CityResponse[]) {
    alert('Received update message! Hooray!');
  }

/*
  private socket;

  constructor(
    protected eventService: EventService,
    protected urls: Urls,
    protected http: HttpClient
  ) {
    super(eventService, urls, http);
      this.socket = socketIo(urls.socket);
    this.socket.on('message', (message: CityResponse[]) => {
      this.update(message);
    });
  }


  update(message: CityResponse[]) {
    console.log('Update received');
  }
  */
}
