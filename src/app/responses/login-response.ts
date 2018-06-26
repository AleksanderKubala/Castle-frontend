import {WorldResponse} from './element-responses/world-response';

export class LoginResponse {

  username: string;
  world: WorldResponse;
  token: string;

  constructor(username: string, world: WorldResponse, token: string) {
    this.username = username;
    this.world = world;
    this.token = token;
  }
}
