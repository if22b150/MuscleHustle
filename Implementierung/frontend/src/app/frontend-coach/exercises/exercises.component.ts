import {Component, ViewChild} from '@angular/core';
import {Exercise} from "../../models/exercise.model";
import {MessageService} from "../../services/message.service";
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {ExerciseService} from "../../services/exercise.service";

@Component({
  selector: 'app-exercises',
  templateUrl: './exercises.component.html',
  styleUrls: ['./exercises.component.scss']
})
export class ExercisesComponent {
  displayedColumns: string[] = ['id', 'type', 'name', 'muscleGroup', 'edit', 'delete'];
  exercises: Exercise;
  dataSource;

  constructor(private messageService: MessageService,
              private exerciseService: ExerciseService) {
    this.exerciseService.exercises$.subscribe((exercises: any) => {
      if (exercises != null) {
        this.exercises = exercises;
        this.dataSource = new MatTableDataSource(exercises);
        this.dataSource.sort = this.sort;
      }
    });
  }

  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {
  }

  edit(id: number) {
    this.messageService.openSnackBar('Übung ' + id + ' kann leider noch nicht editiert werden', 'Ok');
  }

  delete(id: number) {
    this.messageService.openSnackBar('Übung ' + id + ' kann leider noch nicht gelöscht werden', 'Ok');
  }
}
