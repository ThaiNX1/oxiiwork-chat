import {Routes} from '@angular/router';
import {LoginComponent} from "./auth/login/login.component";
import {ForbidenComponent} from "./auth/forbiden/forbiden.component";
import {NotFoundComponent} from "./auth/not-found/not-found.component";
import {AuthGuardService} from "./core/guards/auth-guard.service";

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./layout/layout.module').then(module => module.LayoutModule),
    canActivate: [AuthGuardService],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '403',
    component: ForbidenComponent,
  },
  {
    path: '**',
    component: NotFoundComponent,
  }
];
