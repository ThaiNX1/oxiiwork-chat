import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {GuestLayoutComponent} from "./guest-layout/guest-layout.component";
import {GuestAuthGuardService} from "../core/guards/guest-auth-guard.service";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'guest/chat',
    pathMatch: 'full',
  },
  {
    path: 'guest',
    component: GuestLayoutComponent,
    canActivate: [GuestAuthGuardService],
    children: [
      {
        path: '',
        loadChildren: () => import('../pages/guest/guest.module').then(module => module.GuestModule),
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule {
}
