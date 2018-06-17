import {WorldResponse} from './element-responses/world-response';

export class LoginResponse {

  username: string;
  world: WorldResponse;

  constructor(username: string, world: WorldResponse) {
    this.username = username;
    this.world = world;
  }
}
