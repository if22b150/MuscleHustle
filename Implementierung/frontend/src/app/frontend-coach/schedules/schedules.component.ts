import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatSort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";
import {MessageService} from "../../services/message.service";
import {ScheduleService} from "../../services/schedule.service";
import {Schedule} from "../../models/schedule.model";

const ELEMENT_DATA: Schedule[] = [
 {id: 1, trainerId: 1, clientId: 2, name: 'Trainingsplan 1', exercises: 'Squats, Deadlift, Glute Bridge, Sit Ups, Lunges, …', client: 'Birgit Zeller', enabledForClient: true},
 {id: 2, trainerId: 1, clientId: 2, name: 'Trainingsplan 2', exercises: 'Squats, Deadlift, Glute Bridge, Sit Ups, Lunges, …', client: 'Birgit Zeller', enabledForClient: true},
 {id: 3, trainerId: 1, clientId: 2, name: 'Trainingsplan 3', exercises: 'Squats, Deadlift, Glute Bridge, Sit Ups, Lunges, …', client: 'Birgit Zeller', enabledForClient: false},
 {id: 4, trainerId: 1, clientId: 2, name: 'Trainingsplan 4', exercises: 'Squats, Deadlift, Glute Bridge, Sit Ups, Lunges, …', client: 'Birgit Zeller', enabledForClient: true},
 {id: 5, trainerId: 1, clientId: 2, name: 'Trainingsplan 5', exercises: 'Squats, Deadlift, Glute Bridge, Sit Ups, Lunges, …', client: 'Birgit Zeller', enabledForClient: true},
 {id: 6, trainerId: 1, clientId: 2, name: 'Trainingsplan 6', exercises: 'Squats, Deadlift, Glute Bridge, Sit Ups, Lunges, …', client: 'Birgit Zeller', enabledForClient: true},
 {id: 7, trainerId: 1, clientId: 2, name: 'Trainingsplan 7', exercises: 'Squats, Deadlift, Glute Bridge, Sit Ups, Lunges, …', client: 'Birgit Zeller', enabledForClient: false},
 {id: 8, trainerId: 1, clientId: 2, name: 'Trainingsplan 8', exercises: 'Squats, Deadlift, Glute Bridge, Sit Ups, Lunges, …', client: 'Birgit Zeller', enabledForClient: true},
 {id: 9, trainerId: 1, clientId: 2, name: 'Trainingsplan 9', exercises: 'Squats, Deadlift, Glute Bridge, Sit Ups, Lunges, …', client: 'Birgit Zeller', enabledForClient: true}
];

@Component({
  selector: 'app-schedules',
  templateUrl: './schedules.component.html',
  styleUrls: ['./schedules.component.scss']
})
export class SchedulesComponent  {
  displayedColumns: string[] = ['id', 'client', 'name', 'exercises', 'enabledForClient', 'edit', 'delete'];
  schedules: Schedule[];
  dataSource;

  constructor(private messageService: MessageService,
              private scheduleService: ScheduleService) {
    // this.scheduleService.schedules$.subscribe((schedules: any) => {
    //   if (schedules != null) {
    //     this.schedules = schedules;
    //     this.dataSource = new MatTableDataSource(schedules);
    //     this.dataSource.sort = this.sort;
    //   }
    // });

    this.schedules = ELEMENT_DATA;
    this.dataSource = new MatTableDataSource(this.schedules);
    this.dataSource.sort = this.sort;
  }

  @ViewChild(MatSort) sort: MatSort;

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
