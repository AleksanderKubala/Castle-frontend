import { Component, OnInit } from '@angular/core';
import {EventService} from '../../services/internal-services/event-service/event.service';
import {UpdateService} from '../../services/external-services/game-services/update-service/update.service';
import {CityResponse} from '../../responses/element-responses/city-response';
import {Event} from '../../_config/event-config';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit {

  eventService: EventService;
  updateService: UpdateService;

  constructor(
    eventService: EventService,
    updateService: UpdateService
  ) {
    this.eventService = eventService;
    this.updateService = updateService;
  }

  ngOnInit() {
     /*this.updateService.messages.subscribe(
       result => this.eventService.emit(Event.STORAGE_UPDATE, result)
     );*/
  }
}
