import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {EExerciseType} from "../../../models/enum/exercisetype.model";
import {MatAutocomplete, MatAutocompleteSelectedEvent} from "@angular/material/autocomplete";
import {MatChipInputEvent} from "@angular/material/chips";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {filter, map, Observable, startWith} from "rxjs";
import {MessageService} from "../../../services/message.service";
import {Router} from "@angular/router";
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {MuscleGroupService} from "../../../services/muscle-group.service";
import {MuscleGroup} from "../../../models/muscle-group.model";
import {ExerciseService} from "../../../services/exercise.service";

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
export class ExerciseCreateComponent implements OnInit{
  exerciseForm: FormGroup;
  hideRequiredControl = new FormControl(false);
  floatLabelControl = new FormControl('auto');
  exercise: Exercise;

  visible = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  muscleGroupCtrl = new FormControl();
  filteredMuscleGroups: MuscleGroup[] = [];
  muscleGroups: MuscleGroup[] = [];

  @ViewChild('muscleGroupInput') muscleGroupInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  constructor(private fb: FormBuilder,
              private messageService: MessageService,
              private exerciseService: ExerciseService,
              private muscleGroupService: MuscleGroupService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.exerciseForm = this.fb.group({
      hideRequired: this.hideRequiredControl,
      floatLabel: this.floatLabelControl,
      name: [null, [Validators.required]],
      type: [null, [Validators.required]],
      description: [null, [Validators.required]],
      newMuscleGroup: [null],
      videoLink: [null, [Validators.required]]
    });

    this.muscleGroupService.muscleGroups$
      .pipe(filter(mg => mg != null))
      .subscribe({
        next: (mg) => {
          this.filteredMuscleGroups = mg;
        }
      })
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add muscleGroup
    if (value) {
      this.muscleGroupService.create(value).subscribe({
        next: (mg) => {
          this.muscleGroups.push(mg);
        }
      })
    }

    // Clear the input value
    event.chipInput!.clear();

    this.muscleGroupCtrl.setValue(null);
  }

  remove(muscleGroup: MuscleGroup): void {
    const index = this.muscleGroups.indexOf(muscleGroup);

    if (index >= 0) {
      this.muscleGroups.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.muscleGroups.push(event.option.value);
    this.muscleGroupInput.nativeElement.value = '';
    this.muscleGroupCtrl.setValue(null);

    this.filteredMuscleGroups = this.filteredMuscleGroups.filter(mg => mg.id != event.option.value.id);
  }

  onSubmit() {
    if(this.exerciseForm.valid) {
      let exercise = this.exerciseForm.value;
      this.exerciseService.create(
        this.exerciseForm.get('name').value,
        this.exerciseForm.get('description').value,
        this.exerciseForm.get('videoLink').value,
        this.exerciseForm.get('type').value,
        this.muscleGroups.map(m => m.id)
      ).subscribe({
        next: () => {
          this.router.navigate(['coach/exercises']);
          this.messageService.openSnackBar("Übung wurde erstellt.", "Ok");
          this.exerciseService.getAll();
        }
      });
    }
  }
}
