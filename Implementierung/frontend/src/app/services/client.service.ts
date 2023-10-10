import { Injectable } from '@angular/core';
import {Client} from "../models/client.model";
import {BehaviorSubject, catchError, Observable, of} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private _clients: BehaviorSubject<Client>;

  public get clients$(): Observable<Client> {
    return this._clients.asObservable();
  }

  public get clients(): Client {
    return this._clients.value;
  }

  public set clients(clients: Client) {
    this._clients.next(clients);
  }

  constructor(private _http: HttpClient) {
    this._clients = new BehaviorSubject<Client>(null);
    this.getClients();
  }

  private baseURL: string = 'http://127.0.0.1:8000/api/';

  public getClients() {
    this._http.get<Client>(this.baseURL + 'clients', {})
      .subscribe((data: Client) => {
        catchError(this.handleError<Client[]>('getClients', []))
        this._clients.next(data);
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
