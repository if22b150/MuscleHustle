import {Component, ElementRef, ViewChild} from '@angular/core';
import {EExerciseType} from "../../../models/enum/exercisetype.model";
import {MatAutocomplete, MatAutocompleteSelectedEvent} from "@angular/material/autocomplete";
import {MatChipInputEvent} from "@angular/material/chips";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {map, Observable, startWith} from "rxjs";
import {MessageService} from "../../../services/message.service";
import {Router} from "@angular/router";
import {COMMA, ENTER} from "@angular/cdk/keycodes";

export class Exercise {
  private name: string;
  private type: EExerciseType;
  private description: string;
  private muscleGroup: Array<string>;
  private videoLink: string;

  constructor(name: string, type: EExerciseType, description: string, muscleGroup: Array<string>, videoLink: string) {
    this.name = name;
    this.type = type;
    this.description = description;
    this.muscleGroup = muscleGroup;
    this.videoLink = videoLink;
  }
}

@Component({
  selector: 'app-exercise-create',
  templateUrl: './exercise-create.component.html',
  styleUrls: ['./exercise-create.component.scss']
})
export class ExerciseCreateComponent {
  exerciseForm: FormGroup;
  hideRequiredControl = new FormControl(false);
  floatLabelControl = new FormControl('auto');
  exercise: Exercise;

  visible = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  muscleGroupCtrl = new FormControl();
  filteredMuscleGroups: Observable<string[]>;
  muscleGroups: string[] = ['Unterer Rücken'];
  allMuscleGroups: string[] = ['Bauch', 'Schultern', 'Po', 'Beine', 'Bizeps'];

  @ViewChild('muscleGroupInput') muscleGroupInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  constructor(private fb: FormBuilder,
              private messageService: MessageService,
              private router: Router) {
    this.filteredMuscleGroups = this.muscleGroupCtrl.valueChanges.pipe(
      startWith(null),
      map((muscleGroup: string | null) => muscleGroup ? this._filter(muscleGroup) : this.allMuscleGroups.slice()));

    this.exerciseForm = fb.group({
      hideRequired: this.hideRequiredControl,
      floatLabel: this.floatLabelControl,
      name: [null, [Validators.required]],
      type: [null, [Validators.required]],
      description: [null, [Validators.required]],
      newMuscleGroup: [null],
      videoLink: [null, [Validators.required]]
    });
  }

  ngOnInit(): void {
  }

  createExercise() {
    this.messageService.openSnackBar('Übung wurde angelegt', 'Ausblenden');
    this.exercise = new Exercise('Mountain Climbers', EExerciseType.bodyweight, '', ['Bauch', 'Po'], 'https://www.youtube.com/watch?v=nmwgirgXLYM');
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add muscleGroup
    if (value) {
      this.muscleGroups.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();

    this.muscleGroupCtrl.setValue(null);
  }

  remove(muscleGroup: string): void {
    const index = this.muscleGroups.indexOf(muscleGroup);

    if (index >= 0) {
      this.muscleGroups.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.muscleGroups.push(event.option.viewValue);
    this.muscleGroupInput.nativeElement.value = '';
    this.muscleGroupCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allMuscleGroups.filter(muscleGroup => muscleGroup.toLowerCase().indexOf(filterValue) === 0);
  }

  onSubmit() {
    if(this.exerciseForm.valid) {
      let exercise = this.exerciseForm.value;
      console.log(exercise);
      console.log(this.muscleGroups);
      this.createExercise();
      this.router.navigateByUrl('../');
    }
  }
}
