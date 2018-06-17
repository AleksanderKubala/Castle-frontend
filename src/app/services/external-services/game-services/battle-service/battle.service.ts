import { Injectable } from '@angular/core';
import {AbstractExternalService} from '../../../abstract-external-service';
import {EventService} from '../../../internal-services/event-service/event.service';
import {Urls} from '../../../../_config/server-urls';
import {HttpClient} from '@angular/common/http';
import {Garrison} from '../../../../classes/garrison';
import {GarrisonRequest} from '../../../../requests/garrison-request';
import {BattleResponse} from '../../../../responses/battle-response';
import {AttackRequest} from '../../../../requests/attack-request';

@Injectable()
export class BattleService extends AbstractExternalService {

  constructor(
    protected eventService: EventService,
    protected urls: Urls,
    protected http: HttpClient
  ) {
    super(eventService, urls, http);
  }

  public async attack(attackerCity: number, targetCity: number, requestTroops: Garrison[]): Promise<BattleResponse> {
    const troops: GarrisonRequest[] = [];
    for (let i = 0; i < requestTroops.length; i++) {
      const troop = requestTroops[i];
      troops.push(new GarrisonRequest(troop.unit.name, troop.quantity));
    }
    return this.http.post<BattleResponse>(
      this.urls.attack,
      {attackerCity, targetCity, troops} as AttackRequest
      )
      .toPromise()
      .then()
      .catch(error => this.handleError(error));
  }
}
