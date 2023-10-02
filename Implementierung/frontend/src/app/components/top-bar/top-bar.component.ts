import { Component } from '@angular/core';
import {SidenavService} from "../../services/sidenav.service";

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent {
  currentUser: string = "Thomas";
  currentUserType: string = "Trainer";

  constructor(private sidenavService: SidenavService) { }

  ngOnInit(): void {}

  toggleExpanded():void {
    this.sidenavService.isExpanded = !this.sidenavService.isExpanded;
  }
}
