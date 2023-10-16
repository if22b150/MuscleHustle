import {Component, ViewChild} from '@angular/core';
import {Exercise} from "../../models/exercise.model";
import {MessageService} from "../../services/message.service";
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {ExerciseService} from "../../services/exercise.service";
import {exerciseTypeCast} from "../../models/enum/exercisetype.model";

@Component({
  selector: 'app-exercises',
  templateUrl: './exercises.component.html',
  styleUrls: ['./exercises.component.scss']
})
export class ExercisesComponent {
  displayedColumns: string[] = ['id', 'type', 'name', 'muscleGroups', 'edit', 'delete'];
  exercises: Exercise[];
  dataSource;

  constructor(private messageService: MessageService,
              private exerciseService: ExerciseService) {
    this.exerciseService.exercises$.subscribe((exercises: Exercise[]) => {
      if (exercises != null) {
        this.exercises = exercises;
        this.dataSource = new MatTableDataSource(exercises);
        this.dataSource.sort = this.sort;
      }
    });
  }

  @ViewChild(MatSort) sort: MatSort;

  edit(id: number) {
    this.messageService.openSnackBar('Übung ' + id + ' kann leider noch nicht editiert werden', 'Ok');
  }

  delete(exercise: Exercise) {
    this.exerciseService.delete(exercise.id)
      .subscribe({
        next: () => {
          this.messageService.openSnackBar('Übung "' + exercise.name + '" wurde gelöscht.', 'Ok');
          this.exerciseService.getAll();
        }
      })
  }

  protected readonly exerciseTypeCast = exerciseTypeCast;
}
