import {AbstractService} from './abstract-service';
import {Urls} from '../_config/server-urls';
import {EventService} from './internal-services/event-service/event.service';
import {HttpClient} from '@angular/common/http';
import {Event} from '../_config/event-config';

export abstract class AbstractExternalService extends  AbstractService {

  constructor(protected eventService: EventService, protected urls: Urls, protected http: HttpClient) {
    super(eventService);
  }

  handleError<T>(error: Response) {
    this.eventService.emit(Event.REQUEST_FAILED, this.getErrorMessage(error));
    return Promise.reject(new Error(error.statusText));
  }

  getErrorMessage<T>(error: Response) {
    let message: string;
    const opening = 'An error occurred!';

    if (error.status === 400) {
      message = 'Invalid/malformed request was made.';
    }
    if (error.status === 404) {
      message = 'Requested resource/page was not found.';
    }
    if (error.status === 418) {
      message = '... Stop being a teapot...';
    }

    if (error.status === 500) {
      message = 'Unexpected error from a server. My bad...';

      return opening + ' Status: ' + error.status + ' ' + error.statusText + '. ' + message;
    }
  }
}
