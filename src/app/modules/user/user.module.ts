import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { LoginPage } from './pages/login/login.page';

import { UserRoutingModule } from './user-routing.module';


@NgModule({
  declarations: [
    LoginPage
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserRoutingModule,
    ReactiveFormsModule,
  ]
})
export class UserModule { }
