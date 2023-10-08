import { Injectable } from '@angular/core';
import {BehaviorSubject, catchError, Observable, of} from "rxjs";
import {Exercise} from "../models/exercise.model";
import {HttpClient} from "@angular/common/http";
import {FormGroup} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {
  private _exercises: BehaviorSubject<Exercise>;

  public get exercises$(): Observable<Exercise> {
    return this._exercises.asObservable();
  }

  public get exercises(): Exercise {
    return this._exercises.value;
  }

  public set exercises(exercises: Exercise) {
    this._exercises.next(exercises);
  }

  constructor(private _http: HttpClient) {
    this._exercises = new BehaviorSubject<Exercise>(null);
    this.getExercises();
  }

  private baseURL: string = 'http://127.0.0.1:8000/api/';

  public getExercises() {
    this._http.get<Exercise>(this.baseURL + 'exercises', {})
      .subscribe((data: Exercise) => {
        catchError(this.handleError<Exercise[]>('getExercises', []))
        this._exercises.next(data);
      });
  }

  public storeExercise(values: FormGroup) {
    return this._http.post(this.baseURL + 'exercises', {});
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error("Error");
      console.error(error + operation);
      return of(result as T);
    };
  }
}
