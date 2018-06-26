import {Component, OnInit} from '@angular/core';
import {EventService} from './services/internal-services/event-service/event.service';
import {Event} from './_config/event-config';
import {UserInfoService} from './services/internal-services/user-info-service/user-info.service';
import {AuthService} from './services/external-services/game-services/auth-service/auth.service';
import {FlashMessagesService} from 'angular2-flash-messages';
// import sha256 from 'fast-sha256';
// import {TextEncoder, TextDecoder} from '../../node_modules/text-encoding';
import sha256 from '../../node_modules/crypto-js/sha256';
import Hex from '../../node_modules/crypto-js/enc-Hex';
import {UpdateService} from './services/external-services/game-services/update-service/update.service';

export type PaneType = 'castle' | 'login' | 'city' | 'world' | 'structure';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  eventService: EventService;
  userInfoService: UserInfoService;
  authService: AuthService;
  flashService: FlashMessagesService;
  updateService: UpdateService;

  usernameToRegister: string;
  usernameEmail: string;
  passwordToRegister: string;
  confirmPassword: string;
  cityName: string;

  usernameToLogin: string;
  passwordToLogin: string;

  errorMessage: string;

  isCityVisible = true;
  isLoggedIn = false;
  isWorldVisible = false;
  isCastleVisible = false;
  isStructureVisible = false;
  pane: PaneType;

  username: string;

  constructor(
    eventService: EventService,
    userInfoService: UserInfoService,
    authService: AuthService,
    flashService: FlashMessagesService,
    updateService: UpdateService
    ) {
    this.eventService = eventService;
    this.userInfoService = userInfoService;
    this.authService = authService;
    this.flashService = flashService;
    this.updateService = updateService;
    this.errorMessage = '';
  }

  ngOnInit(): void {
    this.resolvePane();
    this.eventService.on(Event.LOGGED_IN, this.onLogIn, this);
    this.eventService.on(Event.DISPLAY_WORLD, this.onDisplayWorld, this);
    this.eventService.on(Event.DISPLAY_CITY, this.onDisplayCity, this);
    this.eventService.on(Event.DISPLAY_CASTLE, this.onDisplayCastle, this);
    this.eventService.on(Event.DISPLAY_STRUCTURE_DETAILS, this.onDisplayStructure, this);
  }

  onLogIn(username: string): void {
    this.isLoggedIn = true;
    this.username = username[0];
    this.resolvePane();
  }

  onDisplayWorld(): void {
    this.isWorldVisible = true;
    this.isCastleVisible = false;
    this.isCityVisible = false;
    this.isStructureVisible = false;
    this.resolvePane();
  }

  onDisplayCity(): void {
    this.isWorldVisible = false;
    this.isCastleVisible = false;
    this.isCityVisible = true;
    this.isStructureVisible = false;
    this.resolvePane();
  }

  onDisplayCastle(): void {
    this.isWorldVisible = false;
    this.isCastleVisible = true;
    this.isCityVisible = false;
    this.isStructureVisible = false;
    this.resolvePane();
  }

  onDisplayStructure(): void {
    this.isWorldVisible = false;
    this.isCastleVisible = false;
    this.isCityVisible = false;
    this.isStructureVisible = true;
    this.resolvePane();
  }

  resolvePane() {
    if (this.isLoggedIn) {
      if (this.isWorldVisible) {
        this.pane = 'world';
      }
      if (this.isCityVisible) {
        this.pane = 'city';
      }
      if (this.isCastleVisible) {
        this.pane = 'castle';
      }
      if (this.isStructureVisible) {
        this.pane = 'structure';
      }
    } else {
      this.pane = 'login';
    }
  }

  signUp() {
    if (this.passwordMatches()) {
      const hash = this.createHash(this.passwordToRegister);
      this.authService.requestSignUp(
        this.usernameToRegister,
        this.usernameEmail,
        hash,
        this.cityName
      ).then(response => {
        this.flashService.show('User Registered.', { cssClass: 'alert-success', timeout: 5000 });
        this.usernameToRegister = null;
        this.usernameEmail = null;
        this.passwordToRegister = null;
        this.confirmPassword = null;
        this.cityName = null;
      }).catch(response => {
        this.flashService.show('Error occurred. User could not be registered.', { cssClass: 'alert-danger', timeout: 5000 });
      });
    } else {
      this.flashService.show('Password does not match.', { cssClass: 'alert-danger', timeout: 5000 });
    }
  }

  signIn() {
    const hash = this.createHash(this.passwordToLogin);
    this.authService.requestSignIn(
      this.usernameToLogin,
      hash
    ).then(response => {
      localStorage.setItem('token', response.token);
      this.eventService.emit(Event.LOGGED_IN, response.username, response.world.id);
    });
  }

  signOut() {
    this.isWorldVisible = false;
    this.isCastleVisible = false;
    this.isCityVisible = true;
    this.isStructureVisible = false;
    this.username = null;
    this.isLoggedIn = false;
    this.eventService.emit(Event.LOGGED_OUT);
    this.resolvePane();
  }

  passwordMatches() {
    return (this.passwordToRegister === this.confirmPassword);
  }

  createHash(message: string): string {
    const halfProduct = sha256(message);
    return Hex.stringify(halfProduct);
  }

}
