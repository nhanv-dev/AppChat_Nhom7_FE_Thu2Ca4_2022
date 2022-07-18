import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from "./register/register.component";

const routes: Routes = [
  {path: 'home', component: HomeComponent, title: 'App Chat - Trang chủ'},
  {path: 'login', component: LoginComponent, title: 'App Chat - Đăng nhập'},
  {path: 'register', component: RegisterComponent, title: 'App Chat - Đăng ký'},
  {path: '', component: HomeComponent, title: 'App Chat - Trang chủ'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
