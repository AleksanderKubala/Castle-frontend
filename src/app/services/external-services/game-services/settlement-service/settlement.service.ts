import { Injectable } from '@angular/core';
import {AbstractExternalService} from '../../../abstract-external-service';
import {HttpClient} from '@angular/common/http';
import {EventService} from '../../../internal-services/event-service/event.service';
import {Urls} from '../../../../_config/server-urls';
import {SettlementResponse} from '../../../../responses/settlement-response';
import {SettlementRequest} from '../../../../requests/settlement-request';

@Injectable()
export class SettlementService extends AbstractExternalService {

  constructor(
    protected eventService: EventService,
    protected urls: Urls,
    protected http: HttpClient
  ) {
    super(eventService, urls, http);
  }

  public async settle(
    world: number,
    player: string,
    city: number,
    tileRow: number,
    tileColumn: number
  ): Promise<SettlementResponse> {
    const body =  {world, player, city, tileRow, tileColumn} as SettlementRequest;
    const opts = this.getHttpOptions();
    return this.http.post<SettlementResponse>(
      this.urls.settle,
      body,
      opts
    )
      .toPromise()
      .then()
      .catch(error => this.handleError(error));
  }

}
