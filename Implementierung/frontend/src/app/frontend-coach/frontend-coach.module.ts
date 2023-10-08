import {NgModule} from "@angular/core";
import {ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {FrontendCoachComponent} from "./frontend-coach.component";
import { SchedulesComponent } from './schedules/schedules.component';
import {FrontendCoachRoutingModule} from "./frontend-coach-routing.module";
import {MaterialModule} from "../modules/material.module";
import {ExtendedModule, FlexLayoutModule} from "@angular/flex-layout";
import {TopBarComponent} from "./top-bar/top-bar.component";
import { ScheduleCreateComponent } from './schedules/schedule-create/schedule-create.component';
import { ExercisesComponent } from './exercises/exercises.component';
import { ExerciseCreateComponent } from './exercises/exercise-create/exercise-create.component';

@NgModule({
  declarations: [
    FrontendCoachComponent,
    SchedulesComponent,
    TopBarComponent,
    ScheduleCreateComponent,
    ExercisesComponent,
    ExerciseCreateComponent
  ],
  imports: [
    FrontendCoachRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    CommonModule,
    FlexLayoutModule,
    ExtendedModule,
  ]
})
export class FrontendCoachModule { }
