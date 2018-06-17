import { Injectable } from '@angular/core';
import {AbstractExternalService} from '../../../abstract-external-service';
import {EventService} from '../../../internal-services/event-service/event.service';
import {Observable, Observer, Subject} from 'rxjs';
import {CityResponse} from '../../../../responses/element-responses/city-response';
import {Urls} from '../../../../_config/server-urls';
import {HttpClient} from '@angular/common/http';
import {UpdateCallback} from '@angular/core/src/testability/testability';
import {UpdateResponse} from '../../../../responses/update-response';

@Injectable()
export class WebsocketService extends AbstractExternalService {

  private subject: Subject<UpdateResponse>;

  constructor(
    protected eventService: EventService,
    protected urls: Urls,
    protected http: HttpClient
  ) {
    super(eventService, urls, http);
  }

  /*
  public connect() {
    if (!this.subject) {
      this.subject = this.create(this.urls.update);
      console.log('Successfully connected: ' + this.urls.update);
    }
    return this.subject.asObservable();
  }

  public async getUpdate(): Promise<UpdateResponse> {
    return this.http.get<UpdateResponse>(this.urls.update)
      .toPromise()
      .then()
      .catch(error => this.handleError(error));
  }

  private create(url): Subject<UpdateResponse> {
    const ws = new WebSocket(url);

    const observable = Observable.create(
      (obs: Observer<MessageEvent>) => {
        ws.onmessage = obs.next.bind(obs);
        ws.onerror = obs.error.bind(obs);
        ws.onclose = obs.complete.bind(obs);
        return ws.close.bind(ws);
      });
    const observer = {
      next: (data: Object) => {
        if (ws.readyState === WebSocket.OPEN) {
          ws.send(JSON.stringify(data));
        }
      }
    };
    return Subject.create(observer, observable);
  }
  */
}
