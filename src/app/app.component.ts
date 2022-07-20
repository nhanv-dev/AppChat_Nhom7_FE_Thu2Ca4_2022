//src\app\app.component.ts
import {Component} from '@angular/core';
import {WebsocketService} from "./services/websocket.service";
import {ChatService} from "./services/chat.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
  providers: [WebsocketService, ChatService]
})

export class AppComponent {
  public title = 'App Chat';

  constructor() {
  }

}
