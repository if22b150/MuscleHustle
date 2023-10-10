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
    return this._user.value != null && this._user.value.verified && this._user.value.token != null;
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

  // public logout(confirm: boolean = true): void {
    // this.modalService
    //   .open(ConfirmModalComponent, {
    //     data: {
    //       name: 'LOGOUT',
    //       description: 'ARE_YOU_SURE_YOU_WANT_TO_LOGOUT',
    //       icon: 'fas fa-sign-out',
    //       confirmModalType: EConfirmModalType.DANGER
    //     }
    //   })
    //   .onClose.subscribe((confirm) => {
    //   if (confirm) {
    //
    //     this.loading = true;
  //
  //       localStorage.clear();
  //       sessionStorage.clear();
  //
  //       this.http.post<any>(environment.authApiUrl + 'logout', {})
  //         .pipe(finalize(() => {
  //           this.loading = false;
  //         })).subscribe({
  //
  //         next: () => {
  //           console.log('SUCESSFULLY LOGGED OUT'); // TODO: IMPLEMENT ALERT
  //           this.updateUser(null);
  //           window.location.href = '';
  //
  //         }, error: (error) => {
  //           console.log(error); // TODO: IMPLEMENT ALERT
  //         }
  //
  //       })
  //   //   }
  //   // })
  // }


}
