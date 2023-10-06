import { Injectable } from '@angular/core';
import {AuthService} from "./auth.service";
import {Router} from "@angular/router";
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpRequest} from "@angular/common/http";
import {Observable, of, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService {
  constructor(private authService: AuthService,
              private router: Router) {
  }

  private handleAuthError(err: HttpErrorResponse): Observable<any> {
    if (err.status === 401 || err.status === 403) {
      let u = this.authService.user;
      u.token = null;
      this.router.navigate(['login']);
      return of(err.message);
    }
    return throwError(err);
  }

  // this method will add the Bearer token to the Header of the HTTP-Request if a user is logged in
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.authService.token) {
      const modifiedRequest = req.clone({headers: new HttpHeaders().append("Authorization", "Bearer " + this.authService.token)});
      return next.handle(modifiedRequest);
    }

    return next.handle(req);
  }

}
