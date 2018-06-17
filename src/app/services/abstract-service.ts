import {EventService} from './internal-services/event-service/event.service';

export abstract class AbstractService {

  constructor(protected eventService: EventService) {}
}
