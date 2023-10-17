import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatSort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";
import {MessageService} from "../../services/message.service";
import {ScheduleService} from "../../services/schedule.service";
import {Schedule} from "../../models/schedule.model";
import {filter} from "rxjs";
import {Exercise} from "../../models/exercise.model";

@Component({
  selector: 'app-schedules',
  templateUrl: './schedules.component.html',
  styleUrls: ['./schedules.component.scss']
})
export class SchedulesComponent implements OnInit {
  displayedColumns: string[] = ['id', 'client', 'name', 'exercises', 'visible', 'edit', 'delete'];
  schedules: Schedule[];
  dataSource;

  constructor(private messageService: MessageService,
              private scheduleService: ScheduleService) {
  }

  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
    this.scheduleService.schedules$
      .pipe(filter(s => s != null))
      .subscribe({
        next: (s) => {
          this.schedules = s;
          this.dataSource = new MatTableDataSource(s);
          this.dataSource.sort = this.sort;
        }
      });
  }

  edit(id: number) {
    this.messageService.openSnackBar('Trainingsplan #' + id + ' kann leider noch nicht editiert werden', 'Ok');
  }

  delete(schedule: Schedule) {
    this.scheduleService.delete(schedule.id)
      .subscribe({
        next: () => {
          this.messageService.openSnackBar('Trainingsplan "' + schedule.name + '" wurde gelöscht.', 'Ok');
          this.scheduleService.getAll();
        }
      })
  }

  setVisibility(schedule: Schedule) {
    this.scheduleService.setVisibility(schedule.id, !schedule.visible).subscribe({
      next: (s) => {
        this.scheduleService.getAll();
        this.messageService.openSnackBar('Trainingsplan #' + s.id + ' ist nun ' + (s.visible ? 'öffentlich.' : 'nicht mehr öffentlich.'), 'Ok');
      }
    })
  }
}
