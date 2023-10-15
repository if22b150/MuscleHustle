import {Component, OnInit} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import {AbstractControl, FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MessageService} from "../../../services/message.service";
import {Router} from "@angular/router";
import {ExerciseService} from "../../../services/exercise.service";
import {ClientService} from "../../../services/client.service";
import {SetModel} from "../../../models/set.model";
import {Exercise} from "../../../models/exercise.model";
import {ScheduleService} from "../../../services/schedule.service";

@Component({
  selector: 'app-schedule-create',
  templateUrl: './schedule-create.component.html',
  styleUrls: ['./schedule-create.component.scss']
})
export class ScheduleCreateComponent implements OnInit {
  displayedColumns: string[] = ['up', 'down', 'exercise', 'sets', 'edit', 'delete'];
  dataSource = new MatTableDataSource();
  scheduleForm: FormGroup;
  exercisesForm: FormGroup;
  exercises: {index: number, exercise: Exercise, sets: SetModel[]}[] = [];

  constructor(private fb: FormBuilder,
              private messageService: MessageService,
              public exerciseService: ExerciseService,
              public clientService: ClientService,
              private scheduleService: ScheduleService,
              private router: Router) {
  }

  ngOnInit() {
    this.scheduleForm = this.fb.group({
      name: [null, [Validators.required]],
      client: [null, [Validators.required]],
      visible: [false, [Validators.required]],
    });

    this.exercisesForm = this.fb.group({
      exercise: [null, [Validators.required]],
      sets: this.fb.array([]),
    });

    this.initializeSets();
  }

  initializeSets() {
    this.sets.push(this.newSetFormGroup());
  }

  newSetFormGroup(): FormGroup {
    return this.fb.group({
      weight: [null, [Validators.min(0.5)]],
      time: [null, [Validators.min(1)]],
      reps: [null, [Validators.required, Validators.min(1)]],
      rpe: [null, [Validators.required, Validators.min(1), Validators.max(10)]],
      break: [null, [Validators.min(0)]]
    })
  }

  addSet() {
    this.sets.push(this.newSetFormGroup());
  }

  removeSet(i: number) {
    this.sets.removeAt(i);
  }

  get sets(): FormArray {
    return this.exercisesForm.get('sets') as FormArray;
  }

  createSchedule() {
    if (this.scheduleForm.invalid || this.exercises.length == 0)
      return;

    const scheduleData = this.scheduleForm.value;
    const exercisesData = this.exercisesForm.value;

    let sets = [];
    let count = 0;
    this.exercises.forEach(e => {
      e.sets.forEach(s => {
        sets.push({
          exerciseId: e.exercise.id,
          order: count,
          weight: s.weight,
          time: s.time,
          reps: s.reps,
          rpe: s.rpe,
          break: s.break,
        })
        count++;
      })
    });

    this.scheduleService.create(
      scheduleData.name,
      scheduleData.visible,
      scheduleData.client.id,
      sets
    ).subscribe({
      next: (s) => {
        this.messageService.openSnackBar('Trainingsplan wurde erstellt.', 'Ok');
        this.router.navigate(['../']);
        this.scheduleService.getAll();
      }
    })
  }

  removeExercise(index: number) {
    let e = this.exercises.at(index);
    this.exercises = this.exercises.filter(e => e.index != index);
    this.updateExercises();
    this.messageService.openSnackBar('Übung ' + e.exercise.name + ' wurde entfernt.', 'Ok');
  }

  edit(index: number) {
    let e = this.exercises.at(index);
    this.messageService.openSnackBar('Übung ' + e.exercise.name + ' kann leider nicht mehr bearbeitet werden', 'Ok');
  }

  addExercise() {
    if(this.exercisesForm.invalid)
      return;

    let e = {
      index: this.exercises.length,
      exercise: this.exercise.value,
      sets: this.sets.value
    };
    this.exercises.push(e);
    this.updateExercises();

    this.messageService.openSnackBar('Übung ' + e.exercise.name + ' wurde hinzugefügt.', 'Ok');
    this.exercise.setValue(null);
    this.sets.reset();
  }

  moveUp(index: number): void {
    if (index > 0) {
      const temp = this.exercises[index];
      this.exercises[index] = this.exercises[index-1];
      this.exercises[index - 1] = temp;
      this.updateExercises();
    }
  }

  moveDown(index: number): void {
    if (index < this.exercises.length - 1) {
      const temp = this.exercises[index];
      this.exercises[index] = this.exercises[index + 1];
      this.exercises[index + 1] = temp;
      this.updateExercises();
    }
  }

  updateExercises() {
    this.exercises.forEach((e, i) => {
      e.index = i;
    });
    this.dataSource = new MatTableDataSource(this.exercises);
  }

  get name(): AbstractControl {
    return this.scheduleForm.get('name');
  }
  get visible(): AbstractControl {
    return this.scheduleForm.get('visible');
  }
  get client(): AbstractControl {
    return this.scheduleForm.get('client');
  }
  get exercise(): AbstractControl {
    return this.exercisesForm.get('exercise');
  }
}
