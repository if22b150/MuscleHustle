import { Injectable } from '@angular/core';
import {BehaviorSubject, catchError, Observable, of} from "rxjs";
import {Exercise} from "../models/exercise.model";
import {HttpClient} from "@angular/common/http";
import {FormGroup} from "@angular/forms";
import {EExerciseType} from "../models/enum/exercisetype.model";
import {environment} from "../../environments/environment";
import {MuscleGroup} from "../models/muscle-group.model";

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {
  private _exercises: BehaviorSubject<Exercise[]>;

  public get exercises$(): Observable<Exercise[]> {
    return this._exercises.asObservable();
  }

  public get exercises(): Exercise[] {
    return this._exercises.value;
  }

  public set exercises(exercises: Exercise[]) {
    this._exercises.next(exercises);
  }

  constructor(private _http: HttpClient) {
    this._exercises = new BehaviorSubject<Exercise[]>(null);
  }

  private baseURL: string = 'http://127.0.0.1:8000/api/';

  public getAll() {
    this._http.get<Exercise[]>(environment.coachApiUrl + 'exercises', {})
      .subscribe((data: Exercise[]) => {
        catchError(this.handleError<Exercise[]>('getExercises', []))
        this._exercises.next(data);
      });
  }

  public create(name: string, description: string, videoLink: string, type: EExerciseType, muscleGroups: number[]) {
    return this._http.post<Exercise>(environment.coachApiUrl + 'exercises', {name, description, videoLink, type, muscleGroups});
  }

  public delete(id: number) {
    return this._http.delete<any>(environment.coachApiUrl + `exercises/${id}`);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error("Error");
      console.error(error + operation);
      return of(result as T);
    };
  }
}
