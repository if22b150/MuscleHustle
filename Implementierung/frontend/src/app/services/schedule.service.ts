import { Injectable } from '@angular/core';
import {BehaviorSubject, catchError, Observable, of} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Schedule} from "../models/schedule.model";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {
  private _schedules: BehaviorSubject<Schedule>;

  public get schedules$(): Observable<Schedule> {
    return this._schedules.asObservable();
  }

  public get schedules(): Schedule {
    return this._schedules.value;
  }

  public set schedules(schedules: Schedule) {
    this._schedules.next(schedules);
  }

  constructor(private _http: HttpClient) {
    this._schedules = new BehaviorSubject<Schedule>(null);
    this.getSchedules();
  }

  public getSchedules() {
    this._http.get<Schedule>(environment.coachApiUrl + 'schedules', {})
      .subscribe((data: Schedule) => {
        catchError(this.handleError<Schedule[]>('getSchedules', []))
        this._schedules.next(data);
      });
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error("Error");
      console.error(error + operation);
      return of(result as T);
    };
  }
}
