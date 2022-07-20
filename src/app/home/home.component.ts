import {Component, OnInit} from '@angular/core';
import {ChatService} from "../services/chat.service";
import {FormControl, FormGroup} from "@angular/forms";
import {AuthenticationService} from "../services/authentication.service";
import {Router} from "@angular/router";
import {environment} from "../../environments/environment";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public send: any[] = [];
  public received: any[] = [];
  public user: any = undefined;
  public other: any = undefined;
  public users: any[] = [
    {name: 'Võ Chí Nguyên'},
    {name: 'Huỳnh Quốc Nhàn'}
  ];
  public messageForm = new FormGroup({
    to: new FormControl(),
    mes: new FormControl(),
  })

  constructor(private chatService: ChatService, private authenticationService: AuthenticationService, private router: Router) {
    chatService.messages.subscribe(message => {
      const {event, status, data} = message
      console.log("Response from websocket: ", message);
      if (event === environment.event.SEND_CHAT && status === 'success') {
        this.received.push(data);
        this.send.push({
          name: this.user.username,
          mes: this.messageForm.controls.mes.value,
          to: this.messageForm.controls.to.value,
        })
      }
      if (event === environment.event.GET_USER_LIST && status === 'success') {
        this.users = data;
        console.log(this.users);
      }
      if (event === environment.event.CHECK_USER && status !== 'success') {
        authenticationService.removeToken();
        router.navigateByUrl('/login');
      }
    });
    this.checkUser()
  }

  checkUser() {
    const token: any = this.authenticationService.getToken();
    const data: any = {user: token.user}
    this.chatService.checkUser(data)
  }

  ngOnInit(): void {
    if (this.authenticationService.getToken()) {
      this.user = this.authenticationService.getToken();
      this.chatService.getUserList();
    }
  }

  connectPeople(name: string) {

  }

  sendChat() {
    this.chatService.sendChat({
      type: 'people',
      to: this.messageForm.controls.to.value,
      mes: this.messageForm.controls.mes.value
    });
  }

  logout() {
    this.chatService.logout();
    this.authenticationService.removeToken();
    this.router.navigateByUrl('/login');
  }
}
