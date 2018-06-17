import { Injectable } from '@angular/core';
import {AbstractExternalService} from '../../../abstract-external-service';
import {HttpClient} from '@angular/common/http';
import {EventService} from '../../../internal-services/event-service/event.service';
import {Urls} from '../../../../_config/server-urls';
import {LoginRequest} from '../../../../requests/login-request';
import {LoginResponse} from '../../../../responses/login-response';

@Injectable()
export class LoginService extends AbstractExternalService {

  constructor(
    protected eventService: EventService,
    protected urls: Urls,
    protected http: HttpClient
  ) {
    super(eventService, urls, http);
  }

  public async requestLogIn(username: string, password: string): Promise<LoginResponse> {
    return this.http.post<LoginResponse>(this.urls.login, {username, password} as LoginRequest)
      .toPromise()
      .then()
      .catch(error => this.handleError(error));
  }

}
