import { Injectable } from '@angular/core';
import {EventService} from '../../../internal-services/event-service/event.service';
import {LoginResponse} from '../../../../responses/login-response';
import {LoginRequest} from '../../../../requests/login-request';
import {Urls} from '../../../../_config/server-urls';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {AbstractExternalService} from '../../../abstract-external-service';
import {RegisterRequest} from '../../../../requests/register-request';
import {Observable} from 'rxjs';

@Injectable()
export class AuthService extends AbstractExternalService {

  constructor(
    protected eventService: EventService,
    protected urls: Urls,
    protected http: HttpClient
  ) {
    super(eventService, urls, http);
  }

  public async requestSignIn(username: string, password: string): Promise<LoginResponse> {
    const request: LoginRequest = new LoginRequest(username, password);
    return this.http.post<LoginResponse>(this.urls.login, request)
      .toPromise()
      .then()
      .catch(error => this.handleError(error));
  }

  public async requestSignUp(
    username: string,
    email: string,
    password: string,
    city: string
  ):  Promise<any> {
    return this.http.post(
      this.urls.signup,
      {username, email, password, city} as RegisterRequest
    )
      .toPromise()
      .then()
      .catch(error => this.handleError(error));
  }
}
