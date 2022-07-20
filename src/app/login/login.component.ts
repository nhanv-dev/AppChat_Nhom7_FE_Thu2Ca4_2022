import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {ChatService} from "../services/chat.service";
import {Router} from "@angular/router";
import {AuthenticationService} from "../services/authentication.service";
import {environment} from "../../environments/environment";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [ChatService],
})
export class LoginComponent implements OnInit {
  public loginForm = new FormGroup({
    username: new FormControl(),
    password: new FormControl()
  })


  constructor(private chatService: ChatService, private authenticationService: AuthenticationService, private router: Router) {
    if (authenticationService.getToken()) router.navigateByUrl('/home')
    chatService.messages.subscribe(message => {
      console.log("Response from websocket: ", message);
      if (message.event === environment.event.LOGIN && message.status === 'success') {
        const data: any = {
          user: this.loginForm.controls.username.value,
          code: message.data?.RE_LOGIN_CODE
        }
        authenticationService.setToken(JSON.stringify(data))
        router.navigateByUrl('/home');
      }
    });
  }

  ngOnInit(): void {
  }

  login() {
    this.chatService.login({
      user: this.loginForm.controls.username.value,
      pass: this.loginForm.controls.password.value
    })
  }
}
