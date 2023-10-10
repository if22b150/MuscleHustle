import { Injectable } from '@angular/core';
import {AuthService} from "./auth.service";
import {Router} from "@angular/router";
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpRequest} from "@angular/common/http";
import {catchError, Observable, of, throwError} from "rxjs";
import {MessageService} from "./message.service";

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService {
  constructor(private authService: AuthService,
              private messageService: MessageService,
              private router: Router) {
  }

  private handleAuthError(err: HttpErrorResponse): Observable<any> {
    if (err.status === 401 || err.status === 403) {
      this.messageService.openSnackBar("Authentifizierung fehlgeschlagen. Melde dich bitte an.", "Ok");
      let u = this.authService.user;
      u.token = null;
      this.authService.user = u;
      sessionStorage.clear();
      window.location.href = '';
      return of(err.message);
    }
    return throwError(err);
  }

  // this method will add the Bearer token to the Header of the HTTP-Request if a user is logged in
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('req')
    if (this.authService.token) {
      const modifiedRequest = req.clone({headers: new HttpHeaders().append("Authorization", "Bearer " + this.authService.token)});
      return next.handle(modifiedRequest).pipe(
        catchError((error: HttpErrorResponse) => {
          return this.handleAuthError(error);
        }));
    }

    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        return this.handleAuthError(error);
      }));
  }

}
