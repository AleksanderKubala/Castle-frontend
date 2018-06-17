import {EventService} from '../services/internal-services/event-service/event.service';

export abstract class AbstractTileComponent {

  eventService: EventService;

  constructor(eventService: EventService) {
    this.eventService = eventService;
  }
}
