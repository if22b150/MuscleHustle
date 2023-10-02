import { Component } from '@angular/core';
import {Observable} from "rxjs";
import {SidenavService} from "./services/sidenav.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'muscle-hustle-frontend';
  fullExpandMaxWidth: number = 576;

  constructor(public sidenavService: SidenavService) {
  }

  onClick() {
    if(this.sidenavService.isExpanded && window.innerWidth <= this.fullExpandMaxWidth) {
      this.sidenavService.isExpanded = false;
    }
  }
}
