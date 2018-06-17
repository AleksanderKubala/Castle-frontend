import {Component, Input, OnInit} from '@angular/core';
import {LoginService} from '../../services/external-services/game-services/login_service/login.service';
import {EventService} from '../../services/internal-services/event-service/event.service';
import {Event} from '../../_config/event-config';
import {WorldService} from '../../services/external-services/model-services/world-service/world.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @Input() username: string;
  @Input() password: string;

  loginService: LoginService;
  worldService: WorldService;
  eventService: EventService;

  constructor(eventService: EventService, worldService: WorldService, loginService: LoginService) {
    this.loginService = loginService;
    this.worldService = worldService;
    this.eventService = eventService;
  }

  ngOnInit() {
  }

  logIn() {
    this.loginService.requestLogIn(this.username, this.password).then(response => {
      this.eventService.emit(Event.LOGGED_IN, response.username, response.world.id);
    });
  }

}
