import { Component } from '@angular/core';
import {SidenavService} from "../../services/sidenav.service";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent {
  constructor(private sidenavService: SidenavService,
              public authService: AuthService) { }

  ngOnInit(): void {}

  toggleExpanded():void {
    this.sidenavService.isExpanded = !this.sidenavService.isExpanded;
  }

  logout() {
    this.authService.logout();
  }
}
