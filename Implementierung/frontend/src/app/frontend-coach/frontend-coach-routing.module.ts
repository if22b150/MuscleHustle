import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SchedulesComponent} from "./schedules/schedules.component";
import {FrontendCoachComponent} from "./frontend-coach.component";
import {ScheduleCreateComponent} from "./schedules/schedule-create/schedule-create.component";
import {ExercisesComponent} from "./exercises/exercises.component";
import {ExerciseCreateComponent} from "./exercises/exercise-create/exercise-create.component";
import {ClientsComponent} from "./clients/clients.component";
import {ClientCreateComponent} from "./clients/client-create/client-create.component";

const routes: Routes = [
  {
    path: '',
    component: FrontendCoachComponent,
    children: [
      {path: 'schedules', component: SchedulesComponent},
      {path: 'schedules/create', component: ScheduleCreateComponent},
      {path: 'exercises', component: ExercisesComponent},
      {path: 'exercises/create', component: ExerciseCreateComponent},
      {path: 'clients', component: ClientsComponent},
      {path: 'clients/create', component: ClientCreateComponent},
      {path: '**', redirectTo: 'schedules'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FrontendCoachRoutingModule { }
