import { Injectable } from '@angular/core';
import {AbstractExternalService} from '../../../abstract-external-service';
import {HttpClient} from '@angular/common/http';
import {EventService} from '../../../internal-services/event-service/event.service';
import {Urls} from '../../../../_config/server-urls';
import {CityResponse} from '../../../../responses/element-responses/city-response';
 import * as Stomp from '@stomp/stompjs';
import {UserInfoService} from '../../../internal-services/user-info-service/user-info.service';
import {Event} from '../../../../_config/event-config';
import {UpdateResponse} from '../../../../responses/update-response';

@Injectable()
export class UpdateService extends AbstractExternalService {

  stompClient;

  constructor(
    protected eventService: EventService,
    protected urls: Urls,
    protected http: HttpClient,
  ) {
    super(eventService, urls, http);
    this.eventService.on(Event.LOGGED_IN, this.connectToWebSocket, this);
  }

  private connectToWebSocket() {
    const ws = new WebSocket(this.urls.socket);
    this.stompClient = Stomp.over(ws);
    this.stompClient.connect({}, function() {
      this.subscribe('/update', (message) => {
        if (message.body) {
          const updates: UpdateResponse = JSON.parse(message.body);
          EventService.emit(Event.STORAGE_UPDATE, updates);
        }
      });
    });
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
