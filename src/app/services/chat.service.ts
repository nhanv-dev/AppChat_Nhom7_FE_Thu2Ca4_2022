import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import * as Rx from 'rxjs';
import {WebsocketService} from "./websocket.service";
import {AnonymousSubject} from "rxjs/internal/Subject";
import {AuthenticationService} from "./authentication.service";

export interface Message {
  // action: string;
  // data: any;
}

@Injectable({providedIn: 'root'})
export class ChatService {
  public messages: AnonymousSubject<any>;
  public action: string = 'onchat';

  constructor(private wsService: WebsocketService) {
    this.messages = <AnonymousSubject<any>>wsService.connect(environment.CHAT_URL).pipe(
      Rx.map((response: MessageEvent): any => JSON.parse(response.data))
    );
  }

  public login(data: any) {
    const {user, pass} = data;
    const message = {action: this.action, data: {event: environment.event.LOGIN, data: {user, pass}}};
    this.messages.next(message);
  }

  public reLogin(data: any) {
    const {user, code} = data;
    const message = {action: this.action, data: {event: environment.event.RE_LOGIN, data: {user, code}}};
    this.messages.next(message);
  }

  public logout() {
    const message = {action: this.action, data: {event: environment.event.LOGOUT}}
    this.messages.next(message);
  }

  public register(data: any) {
    const {user, pass} = data;
    const message = {action: this.action, data: {event: environment.event.REGISTER, data: {user, pass}}};
    this.messages.next(message);
  }

  public sendChat(data: any) {
    const {type, to, mes} = data;
    const message = {action: this.action, data: {event: environment.event.SEND_CHAT, data: {type, to, mes}}};
    this.messages.next(message);
  }

  public createRoom(name: string) {
    const message = {action: this.action, data: {event: environment.event.CREATE_ROOM, data: {name}}};
    this.messages.next(message);
  }

  public getRoomMessage(name: string, page: number) {
    const message = {action: this.action, data: {event: environment.event.GET_ROOM_CHAT_MES, data: {name, page}}}
    this.messages.next(message);
  }

  public joinRoom(name: string) {
    const message = {action: this.action, data: {event: environment.event.JOIN_ROOM, data: {name}}}
    this.messages.next(message);
  }

  public getPeopleMessage(name: string, page: number) {
    const message = {action: this.action, data: {event: environment.event.GET_PEOPLE_CHAT_MES, data: {name, page}}}
    this.messages.next(message);
  }

  public checkUser(data: any) {
    const {user} = data;
    const message = {action: this.action, data: {event: environment.event.CHECK_USER, data: {user}}}
    this.messages.next(message);
  }

  public getUserList() {
    const message = {action: this.action, data: {event: environment.event.GET_USER_LIST}};
    this.messages.next(message);
  }
}
