import { Injectable } from '@angular/core';
import {BehaviorSubject, catchError, Observable, of} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Schedule} from "../models/schedule.model";

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

  private baseURL: string = 'http://127.0.0.1:8000/api/';

  public getSchedules() {
    this._http.get<Schedule>(this.baseURL + 'schedules', {})
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
