import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {AuthService} from "../services/auth.service";
import {ERole} from "../models/user.model";

export const loginGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if(!authService.isLoggedIn)
    return true;

  if (authService.user.role == ERole.COACH) {
    router.navigate(['coach']);
    return false;
  } else if (authService.user.role == ERole.CLIENT) {
    router.navigate(['client']);
    return false;
  }
};
