import {Component, OnInit} from '@angular/core';
import {SidenavService} from "../services/sidenav.service";
import {MuscleGroupService} from "../services/muscle-group.service";
import {ExerciseService} from "../services/exercise.service";
import {ScheduleService} from "../services/schedule.service";

@Component({
  selector: 'app-frontend-coach',
  templateUrl: './frontend-coach.component.html',
  styleUrls: ['./frontend-coach.component.scss']
})
export class FrontendCoachComponent implements OnInit{
  fullExpandMaxWidth: number = 576;

  constructor(public sidenavService: SidenavService,
              private muscleGroupService: MuscleGroupService,
              private exerciseService: ExerciseService,
              private scheduleService: ScheduleService) {
  }

  onClick() {
    if(this.sidenavService.isExpanded && window.innerWidth <= this.fullExpandMaxWidth) {
      this.sidenavService.isExpanded = false;
    }
  }

  ngOnInit(): void {
    this.muscleGroupService.getAll();
    this.exerciseService.getAll();
    this.scheduleService.getAll();
  }
}
