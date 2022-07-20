  //src\app\app.component.ts
import {Component} from '@angular/core';
import {WebsocketService} from "./services/websocket.service";
import {environment} from "../environments/environment";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {Title} from "@angular/platform-browser";
import {filter} from "rxjs-compat/operator/filter";
import {map} from "rxjs-compat/operator/map";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
  providers: [WebsocketService]
})

export class AppComponent {
  title = 'App Chat';
  content = '';
  received = [];
  sent = [];

  constructor(private wsService: WebsocketService) {
  }
}
