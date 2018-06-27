import {Injectable} from '@angular/core';
import {EventEmitter} from 'events';
import { Event } from '../../../_config/event-config';
import {isNullOrUndefined} from 'util';

@Injectable()
export class EventService {

  private static instance: EventService;
  private emitter: EventEmitter;

  constructor() {
    this.emitter = new EventEmitter();
    EventService.instance = this;
  }

  public static on (event: Event, listener: Function, context = null) {
    EventService.instance.on(event, listener, context);
  }

  public static emit(event: Event, ...args: any[]) {
    EventService.instance.emit(event, args[0]);
  }

  public on(event: Event, listener: Function, context = null) {
    if (isNullOrUndefined(context)) {
      this.emitter.on(event.toString(), listener);
    } else {
      this.emitter.on(event.toString(), listener.bind(context));
    }
  }

  public emit(event: Event, ...args: any[]) {
    this.emitter.emit(event.toString(), args);
  }

}
