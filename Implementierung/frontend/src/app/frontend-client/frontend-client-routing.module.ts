import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SchedulesComponent} from "./schedules/schedules.component";
import {FrontendClientComponent} from "./frontend-client.component";
import {SettingsComponent} from "./settings/settings.component";
import {ScheduleComponent} from "./schedules/schedule/schedule.component";

const routes: Routes = [
  {
    path: '',
    component: FrontendClientComponent,
    children: [
      {path: 'schedules', component: SchedulesComponent},
      {path: 'schedules/:id', component: ScheduleComponent},
      {path: 'settings', component: SettingsComponent},
      {path: '**', redirectTo: 'schedules'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FrontendClientRoutingModule { }
