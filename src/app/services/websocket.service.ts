import {Injectable} from "@angular/core";
import * as Rx from 'rxjs';
import {environment} from "../../environments/environment";

export interface Message {
  source: string;
  content: string;
}

@Injectable()
export class WebsocketService {
  private subject: Rx.Subject<MessageEvent> | undefined;
  public messages: Rx.Subject<Message> | undefined;

  constructor() {

  }

  public connect(url: string): Rx.Subject<MessageEvent> {
    if (!this.subject) {
      this.subject = this.create(url);
      console.log("Successfully connected: " + url);
    }
    return this.subject;
  }

  private create(url: string): Rx.Subject<MessageEvent> {
    let ws = new WebSocket(url);
    let observable = new Rx.Observable((obs: Rx.Observer<MessageEvent>) => {
      ws.onmessage = obs.next.bind(obs);
      ws.onerror = obs.error.bind(obs);
      ws.onclose = obs.complete.bind(obs);
      return ws.close.bind(ws);
    });
    let observer = {
      error: null,
      complete: null,
      next: (data: Object) => {
        console.log('Message sent to websocket: ', data);
        if (ws.readyState === WebSocket.OPEN) ws.send(JSON.stringify(data));
      }
    };
    // @ts-ignore
    return new Rx.Subject<MessageEvent>(observer, observable);
  }
}
