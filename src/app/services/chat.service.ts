import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import * as Rx from 'rxjs';
import {Subject} from "rxjs";
import {WebsocketService} from "./websocket.service";

export interface Message {
  author: string,
  message: string
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  public messages: Subject<Message> | undefined;


  constructor(private wsService: WebsocketService) {
    this.messages = <Rx.Subject<Message>>wsService.connect(environment.CHAT_URL).pipe(
      Rx.map((response: MessageEvent): Message => {
        console.log(response.data);
        return JSON.parse(response.data);
      })
    );
  }
}
