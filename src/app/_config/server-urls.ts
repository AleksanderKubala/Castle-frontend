import {Injectable} from '@angular/core';

@Injectable()
export class Urls {
  baseUrl = 'http://localhost:8080';
  socket = 'http://localhost:8080/socket';
  terrains = this.baseUrl + '/terraintypes';
  buildings = this.baseUrl + '/buildingtypes';
  structures = this.baseUrl + '/structuretypes';
  resources = this.baseUrl + '/resource';
  units = this.baseUrl + '/unit';
  city = this.baseUrl + '/city';
  world = this.baseUrl + '/world';
  login = this.baseUrl + '/login';
  player = this.baseUrl + '/player';
  playerCities = this.city + '/player';
  cityManagement = this.baseUrl + '/citymanage';
  constructBuilding = this.cityManagement + '/construct';
  destroyBuilding = this.cityManagement + '/destroy';
  update = this.baseUrl + '/update';
  recruitUnit = this.baseUrl + '/recruit';
  dismissUnit = this.baseUrl + '/dismiss';
  attack = this.baseUrl + '/attack';
  settle = this.baseUrl + '/settle';
  signup = this.baseUrl + '/signup';
  signin = this.baseUrl + '/signin';
  singout = this.baseUrl + '/signout';
}
