import { Component } from '@angular/core';
import {ScheduleService} from "../../services/schedule.service";

@Component({
  selector: 'app-schedules',
  templateUrl: './schedules.component.html',
  styleUrls: ['./schedules.component.scss']
})
export class SchedulesComponent {
  constructor(public scheduleService: ScheduleService) {
  }
}
