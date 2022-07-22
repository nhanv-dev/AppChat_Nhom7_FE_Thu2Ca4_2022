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
  public connectedChatting: any = undefined;
  public users: any[] = [];
  public messageForm = new FormGroup({
    to: new FormControl(),
    mes: new FormControl(),
  })

  constructor(private chatService: ChatService, private authenticationService: AuthenticationService, private router: Router) {
    if (!authenticationService.isUserAuthenticated) {
      authenticationService.removeToken();
      router.navigateByUrl('/login');
    }
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
      if (event === environment.event.GET_USER_LIST && status === 'success') this.setUsers(data);
      if (event === environment.event.CHECK_USER && status !== 'success') this.logout();
    });
  }


  ngOnInit(): void {
    const dataUser = this.authenticationService.getToken();
    if (dataUser) {
      this.user = this.authenticationService.getToken();
      this.chatService.getUserList();
    } else {
      this.logout();
    }
  }

  async reLogin() {
    const dataUser = this.authenticationService.getToken();
    if (dataUser) {

    }
  }

  async setUsers(data: any) {
    this.users = data;
  }

  async connectPeople(name: string) {

  }

  async checkUser() {
    const dataUser: any = this.authenticationService.getToken();
    const data: any = {user: dataUser.user}
    await this.chatService.checkUser(data)
  }

  async sendChat() {
    await this.chatService.sendChat({
      type: 'people',
      to: this.messageForm.controls.to.value,
      mes: this.messageForm.controls.mes.value
    });
  }

  async handleSendChat() {

  }

  async logout() {
    this.authenticationService.removeToken();
    await this.chatService.logout();
    await this.router.navigateByUrl('/login');
  }
}
