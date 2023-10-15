import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatSort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";
import {MessageService} from "../../services/message.service";
import {ScheduleService} from "../../services/schedule.service";
import {Schedule} from "../../models/schedule.model";
import {filter} from "rxjs";

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

  toggleEnabled(checked: boolean, id: number) {
    this.messageService.openSnackBar('Trainingsplan #' + id + ' ist nun ' + (checked ? 'öffentlich.' : 'nicht mehr öffentlich.'), 'Ok');
  }

  edit(id: number) {
    this.messageService.openSnackBar('Trainingsplan #' + id + ' kann leider noch nicht editiert werden', 'Ok');
  }

  delete(id: number) {
    this.messageService.openSnackBar('Trainingsplan #' + id + ' kann leider noch nicht gelöscht werden', 'Ok');
  }
}
