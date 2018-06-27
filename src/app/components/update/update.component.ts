import { Component, OnInit } from '@angular/core';
import {EventService} from '../../services/internal-services/event-service/event.service';
import {UpdateService} from '../../services/external-services/game-services/update-service/update.service';
import {CityResponse} from '../../responses/element-responses/city-response';
import {Event} from '../../_config/event-config';
import {HttpClient} from '@angular/common/http';
import {Urls} from '../../_config/server-urls';
import * as Stomp from '@stomp/stompjs';
import * as SockJS from '../../../../node_modules/sockjs-client';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit {

  eventService: EventService;
  urls: Urls;
  stompClient;

  constructor(
    eventService: EventService,
    urls: Urls,
  ) {
   this.eventService = eventService;
   this.urls = urls;
  }

  ngOnInit(): void {
    this.stompClient = Stomp.over(function () {
      return new SockJS(this.urls.socket);
    });
    this.stompClient.connect({}, function(frame) {
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
}
