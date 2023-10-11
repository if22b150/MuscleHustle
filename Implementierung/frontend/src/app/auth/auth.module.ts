import {NgModule} from "@angular/core";
import { LoginComponent } from './login/login.component';
import {ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {CommonModule} from "@angular/common";
import {MatFormFieldModule} from "@angular/material/form-field";
import {AuthRoutingModule} from "./auth-routing.module";
import {MatIconModule} from "@angular/material/icon";

@NgModule({
  declarations: [
    LoginComponent
  ],
    imports: [
        ReactiveFormsModule,
        MatInputModule,
        MatButtonModule,
        MatCardModule,
        MatFormFieldModule,
        CommonModule,
        AuthRoutingModule,
        MatIconModule
    ]
})
export class AuthModule { }
