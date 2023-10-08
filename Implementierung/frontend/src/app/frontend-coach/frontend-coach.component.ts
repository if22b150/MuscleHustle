import { Component } from '@angular/core';
import {SidenavService} from "../services/sidenav.service";

@Component({
  selector: 'app-frontend-coach',
  templateUrl: './frontend-coach.component.html',
  styleUrls: ['./frontend-coach.component.scss']
})
export class FrontendCoachComponent {
  fullExpandMaxWidth: number = 576;

  constructor(public sidenavService: SidenavService) {
  }

  onClick() {
    if(this.sidenavService.isExpanded && window.innerWidth <= this.fullExpandMaxWidth) {
      this.sidenavService.isExpanded = false;
    }
  }
}
