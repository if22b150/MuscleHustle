import { Injectable } from '@angular/core';
import {BehaviorSubject, catchError, Observable, of} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Schedule} from "../models/schedule.model";
import {environment} from "../../environments/environment";
import {Exercise} from "../models/exercise.model";
import {SetModel} from "../models/set.model";

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {
  private _schedules: BehaviorSubject<Schedule[]>;

  public get schedules$(): Observable<Schedule[]> {
    return this._schedules.asObservable();
  }

  public get schedules(): Schedule[] {
    return this._schedules.value;
  }

  public set schedules(schedules: Schedule[]) {
    this._schedules.next(schedules);
  }

  constructor(private _http: HttpClient) {
    this._schedules = new BehaviorSubject<Schedule[]>(null);
  }

  public getAll() {
    this._http.get<Schedule[]>(environment.coachApiUrl + 'schedules', {})
      .subscribe((data: Schedule[]) => {
        catchError(this.handleError<Schedule[]>('getSchedules', []))
        this._schedules.next(data);
      });
  }

  public create(name: string, visible: boolean, clientId: number, sets: any[]) {
    return this._http.post<Schedule>(environment.coachApiUrl + 'schedules', {name, visible, clientId, sets});
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error("Error");
      console.error(error + operation);
      return of(result as T);
    };
  }
}
