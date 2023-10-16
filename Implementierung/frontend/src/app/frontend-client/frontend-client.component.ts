import {Component, OnInit} from '@angular/core';
import {SidenavService} from "../services/sidenav.service";
import {ScheduleService} from "../services/schedule.service";

@Component({
  selector: 'app-frontend-client',
  templateUrl: './frontend-client.component.html',
  styleUrls: ['./frontend-client.component.scss']
})
export class FrontendClientComponent implements OnInit{
  fullExpandMaxWidth: number = 576;

  constructor(public sidenavService: SidenavService,
              private scheduleService: ScheduleService) {
  }

  onClick() {
    if(this.sidenavService.isExpanded && window.innerWidth <= this.fullExpandMaxWidth) {
      this.sidenavService.isExpanded = false;
    }
  }

  ngOnInit(): void {
    // this.muscleGroupService.getAll();
    // this.exerciseService.getAll();
    this.scheduleService.clientGetAll();
    // this.clientService.getAll();
  }
}
