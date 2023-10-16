import {NgModule} from "@angular/core";
import {ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {MaterialModule} from "../modules/material.module";
import {ExtendedModule, FlexLayoutModule} from "@angular/flex-layout";
import {FrontendClientComponent} from "./frontend-client.component";
import {FrontendClientRoutingModule} from "./frontend-client-routing.module";
import {TopBarComponent} from "./top-bar/top-bar.component";
import { SchedulesComponent } from './schedules/schedules.component';
import { SettingsComponent } from './settings/settings.component';
import { ScheduleComponent } from './schedules/schedule/schedule.component';

@NgModule({
  declarations: [
    FrontendClientComponent,
    TopBarComponent,
    SchedulesComponent,
    SettingsComponent,
    ScheduleComponent
  ],
  imports: [
    FrontendClientRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    CommonModule,
    FlexLayoutModule,
    ExtendedModule,
  ]
})
export class FrontendClientModule { }
