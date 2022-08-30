import EventEmitter from 'events';

export class EventsDispatcher {
  private static _emitter = new EventEmitter();

  constructor(private event: string) {
  }

  static setEvent(event: string) {
    return new EventsDispatcher(event);
  }

  update = (...args: any[]) => {
    EventsDispatcher._emitter.emit(this.event, args);
  }

  listen = (eventFunction: any) => {
    EventsDispatcher._emitter.on(this.event, eventFunction);
  }

  unlisten = (eventFunction: any) => {
    EventsDispatcher._emitter.off(this.event, eventFunction);
  }
}
