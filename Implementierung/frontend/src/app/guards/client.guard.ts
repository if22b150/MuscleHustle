import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {AuthService} from "../services/auth.service";
import {ERole} from "../models/user.model";

export const clientGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if(authService.isLoggedIn && authService.user.role == ERole.CLIENT)
    return true;
  router.navigate(['login']);
  return false;
};
