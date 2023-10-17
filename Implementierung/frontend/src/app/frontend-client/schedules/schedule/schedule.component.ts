import {Component, Input, OnInit} from '@angular/core';
import {Schedule} from "../../../models/schedule.model";
import {ScheduleService} from "../../../services/schedule.service";
import {MessageService} from "../../../services/message.service";
import {ActivatedRoute, Router} from "@angular/router";
import {filter} from "rxjs";
import {SetModel} from "../../../models/set.model";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit{
  schedule: Schedule;
  columnsRestriction: boolean = (window.innerWidth <= 600);
  constructor(private scheduleService: ScheduleService,
              private messageService: MessageService,
              protected _sanitizer: DomSanitizer,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    let id = +this.route.snapshot.paramMap.get('id');
    if(!id || isNaN(id)) {
      this.messageService.openSnackBar('Der Trainingsplan existiert nicht.', 'Ok');
      this.router.navigate(['/client/schedules']);
    }

    this.scheduleService.schedules$
      .pipe(filter(s => s != null))
      .subscribe({
        next: (schedules) => {
          if((this.schedule = schedules.find(s => s.id == id)) == null) {
            this.messageService.openSnackBar('Der Trainingsplan konnte nicht abgerufen nicht.', 'Ok');
            this.router.navigate(['/client/schedules']);
          }

        }
      })
  }

  getSetCols(set: SetModel): number {
    let cnt = 0;
    if(set.weight)
      cnt++;
    if(set.rpe)
      cnt++;
    if(set.time)
      cnt++;
    if(set.reps)
      cnt++;

    return this.columnsRestriction ? 2 : cnt;
  }

  handleSize(event) {
    this.columnsRestriction = (event.target.innerWidth <= 600);
  }

  finish() {
    this.router.navigate(['/client/schedules']);
  }

  transformDescription(description: string): string {
    return description.replace(/\n|\\n/g,"<br>");
  }

  transformVideo(link: string) {
    return this._sanitizer.bypassSecurityTrustResourceUrl(link);
  }

}
