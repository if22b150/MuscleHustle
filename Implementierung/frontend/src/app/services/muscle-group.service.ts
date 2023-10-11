import { Injectable } from '@angular/core';
import {BehaviorSubject, catchError, Observable, of} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {MuscleGroup} from "../models/muscle-group.model";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class MuscleGroupService {
  private _muscleGroups: BehaviorSubject<MuscleGroup[]>;

  public get muscleGroups$(): Observable<MuscleGroup[]> {
    return this._muscleGroups.asObservable();
  }

  public get muscleGroups(): MuscleGroup[] {
    return this._muscleGroups.value;
  }

  public set muscleGroups(muscleGroups: MuscleGroup[]) {
    this._muscleGroups.next(muscleGroups);
  }

  constructor(private _http: HttpClient) {
    this._muscleGroups = new BehaviorSubject<MuscleGroup[]>(null);
  }

  public getAll() {
    this._http.get<MuscleGroup[]>(environment.coachApiUrl + 'muscle-groups', {})
      .subscribe((data: MuscleGroup[]) => {
        catchError(this.handleError<MuscleGroup[]>('getMuscleGroups', []))
        this._muscleGroups.next(data);
      });
  }

  public create(name: string): Observable<MuscleGroup> {
    return this._http.post<MuscleGroup>(environment.coachApiUrl + 'muscle-groups', {name});
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error("Error");
      console.error(error + operation);
      return of(result as T);
    };
  }
}
