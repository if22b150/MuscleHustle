import {Component, ViewChild} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MatSort} from "@angular/material/sort";
import {MessageService} from "../../../services/message.service";
import {Router} from "@angular/router";

export interface Schedule {
  id: number;
  order: number;
  name: string;
  sets: number;
  note: string;
}

const ELEMENT_DATA: Schedule[] = [
  {id: 1, order: 1, name: 'Übungsname 1', sets: 1, note: 'Notiz 1'},
  {id: 2, order: 2, name: 'Übungsname 2', sets: 2, note: 'Notiz 2'},
  {id: 3, order: 3, name: 'Übungsname 3', sets: 3, note: 'Notiz 3'},
  {id: 4, order: 4, name: 'Übungsname 4', sets: 4, note: 'Notiz 4'},
  {id: 5, order: 5, name: 'Übungsname 5', sets: 1, note: 'Notiz 5'},
  {id: 6, order: 6, name: 'Übungsname 6', sets: 2, note: 'Notiz 6'},
  {id: 7, order: 7, name: 'Übungsname 7', sets: 3, note: 'Notiz 7'},
  {id: 8, order: 8, name: 'Übungsname 8', sets: 4, note: 'Notiz 8'},
  {id: 9, order: 9, name: 'Übungsname 9', sets: 5, note: 'Notiz 9'}
];

export class Exercise {
  private name: string;
  private description: string;
  private muscleGroup: Array<string>;
  private videoLink: string;

  constructor(name: string, description: string, muscleGroup: Array<string>, videoLink: string) {
    this.name = name;
    this.description = description;
    this.muscleGroup = muscleGroup;
    this.videoLink = videoLink;
  }
}

@Component({
  selector: 'app-schedule-create',
  templateUrl: './schedule-create.component.html',
  styleUrls: ['./schedule-create.component.scss']
})
export class ScheduleCreateComponent {
  displayedColumns: string[] = ['order', 'name', 'sets', 'note', 'delete'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  scheduleForm: FormGroup;
  hideRequiredControl = new FormControl(false);
  floatLabelControl = new FormControl('auto');
  exercise: Exercise;

  @ViewChild(MatSort) sort: MatSort;

  constructor(private fb: FormBuilder,
              private messageService: MessageService,
              private router: Router) {
    this.scheduleForm = fb.group({
      hideRequired: this.hideRequiredControl,
      floatLabel: this.floatLabelControl,
      sets: this.fb.array([], Validators.required),
      scheduleName: [null, [Validators.required]],
      client: [null, [Validators.required]],
      clientEnabled: [null, [Validators.required]],
      exercise: [null, [Validators.required]],
      exerciseNote: [null, [Validators.required]],
      exerciseOrderNumber: [null, [Validators.required]]
    });

    this.initializeSets();
  }

  onSubmit() {
    if(this.scheduleForm.valid) {
      let schedule = this.scheduleForm.value;
      let sets = this.scheduleForm.value.sets;
      console.log(schedule);
      console.log(sets);
      this.createSchedule();
      this.router.navigateByUrl('../');
    }
  }

  initializeSets() {
    this.sets.push(this.newSetsFormGroup());
  }

  get sets(): FormArray {
    return this.scheduleForm.get("sets") as FormArray
  }

  newSetsFormGroup(): FormGroup {
    return this.fb.group({
      weight: [null, [Validators.required, Validators.min(0.1)]],
      durationTime: [null, [Validators.required, Validators.min(1)]],
      repNumber: [null, [Validators.required, Validators.min(1)]],
      rpe: [null, [Validators.required, Validators.min(1)]],
      breakTime: [null, [Validators.required, Validators.min(0)]],
      setOrderNumber: [null, [Validators.required, Validators.min(1)]]
    })
  }

  addSets() {
    this.sets.push(this.newSetsFormGroup());
  }

  removeSet(i: number) {
    this.sets.removeAt(i);
  }


  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  createSchedule() {
    this.messageService.openSnackBar('Trainingsplan wurde angelegt', 'ok');
    //this.exercise = new Exercise('Mountain Climbers', '', ['Bauch', 'Po'], 'https://www.youtube.com/watch?v=nmwgirgXLYM');
  }

  delete(id: number) {
    this.messageService.openSnackBar('Übung ' + id + ' kann leider noch nicht gelöscht werden', 'Ok');
  }

  createExercise() {
    this.messageService.openSnackBar('Übung wurde angelegt', 'ok');
  }
}
