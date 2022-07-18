import {Component, OnInit} from '@angular/core';
import {WebsocketService} from "../services/websocket.service";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [WebsocketService],
})
export class LoginComponent implements OnInit {
  public loginForm = new FormGroup({
    username: new FormControl(),
    password: new FormControl()
  })

  constructor(private websocket: WebsocketService) {
  }

  ngOnInit(): void {
  }

  // {user: 'long', pass: '12345'}

  async onSubmit() {
    let message = {
      action: 'onchat',
      data: {
        event: 'LOGIN',
        data: {
          user: this.loginForm.controls.username.value,
          password: this.loginForm.controls.password.value
        }
      }
    };

    // @ts-ignore
    this.sent.push(message);
    // @ts-ignore
    this.WebsocketService.messages.next(message);
    // @ts-ignore
    this.sent.push(message);
    // @ts-ignore
    this.WebsocketService.messages.next(message);
  }

}
