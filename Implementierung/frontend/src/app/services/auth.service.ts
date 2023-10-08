import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {ERole, User} from "../models/user.model";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _user: BehaviorSubject<User>;

  public get user$(): Observable<User> {
    return this._user.asObservable();
  }

  public get user(): User {
    return this._user.value;
  }

  public set user(user: User) {
    if (user && !user?.token) {
      user.token = this.token;
    }

    this._user.next(user);

    localStorage.removeItem('user');
    localStorage.setItem('user', JSON.stringify(user));
  }

  public get token(): string {
    return this.user?.token;
  }

  public get isLoggedIn(): boolean {
    return this._user.value != null && this._user.value.verified;
  }

  constructor(private http: HttpClient) {
    let savedUser = JSON.parse(localStorage.getItem('user'));
    this._user = new BehaviorSubject<User>(savedUser);
  }


  public login(email: string, password: string): Promise<any> {

    return new Promise<any>((resolve, reject) => {

      return this.http.post<User>(environment.authApiUrl + 'login', {email: email, password: password})
        .subscribe({
          next: (user: User) => {
            this.user = user;

            if (this.user.role == ERole.CLIENT) {
              window.location.href = 'client';
            } else if (this.user.role == ERole.COACH) {
              window.location.href = 'coach';
            }
            resolve(user);
          }, error: (error) => {
            console.log(error); // TODO: IMPLEMENT ALERT
            reject(error);
          }
        })
    })
  }

}
