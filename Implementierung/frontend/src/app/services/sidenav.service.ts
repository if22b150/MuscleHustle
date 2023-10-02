import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SidenavService {
  private _isExpanded: BehaviorSubject<boolean>;

  public get isExpanded$(): Observable<boolean> {
    return this._isExpanded.asObservable();
  }

  public get isExpanded(): boolean {
    return this._isExpanded.value;
  }

  public set isExpanded(isExpanded: boolean) {
    this._isExpanded.next(isExpanded);
  }

  constructor() {
    this._isExpanded = new BehaviorSubject<boolean>(false);
  }
}
