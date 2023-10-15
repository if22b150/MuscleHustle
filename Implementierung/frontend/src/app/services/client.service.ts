import { Injectable } from '@angular/core';
import {Client} from "../models/client.model";
import {BehaviorSubject, catchError, Observable, of} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {EExerciseType} from "../models/enum/exercisetype.model";
import {Exercise} from "../models/exercise.model";
import {EGenderType} from "../models/enum/gendertype.model";

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private _clients: BehaviorSubject<Client[]>;

  public get clients$(): Observable<Client[]> {
    return this._clients.asObservable();
  }

  public get clients(): Client[] {
    return this._clients.value;
  }

  public set clients(clients: Client[]) {
    this._clients.next(clients);
  }

  constructor(private _http: HttpClient) {
    this._clients = new BehaviorSubject<Client[]>(null);
  }

  public getAll() {
    this._http.get<Client[]>(environment.coachApiUrl + 'clients', {})
      .subscribe((data: Client[]) => {
        catchError(this.handleError<Client[]>('getClients', []))
        this._clients.next(data);
      });
  }

  public create(firstname: string, lastname: string, email: string, gender: EGenderType, phone: string, password: string) {
    return this._http.post<Client>(environment.coachApiUrl + 'clients', {firstname, lastname, email, gender, phone, password});
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error("Error");
      console.error(error + operation);
      return of(result as T);
    };
  }
}
