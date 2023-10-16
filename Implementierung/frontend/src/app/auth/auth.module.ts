import {NgModule} from "@angular/core";
import { LoginComponent } from './login/login.component';
import {ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {AuthRoutingModule} from "./auth-routing.module";
import {MaterialModule} from "../shared/modules/material.module";

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
      ReactiveFormsModule,
      MaterialModule,
      CommonModule,
      AuthRoutingModule
  ]
})
export class AuthModule { }
