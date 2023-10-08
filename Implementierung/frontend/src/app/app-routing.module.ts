import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {loginGuard} from "./guards/login.guard";
import {coachGuard} from "./guards/coach.guard";

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
    canActivate: [loginGuard]
  },
  {
    path: 'coach',
    loadChildren: () => import('./frontend-coach/frontend-coach.module').then(m => m.FrontendCoachModule),
    canActivate: [coachGuard]
  },
  {path: '**', redirectTo: 'auth'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
