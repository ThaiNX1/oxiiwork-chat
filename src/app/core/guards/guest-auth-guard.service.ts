import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from "@angular/router";
import { storageKey } from "../constants/storage-key";
import { AuthService } from "../../auth/auth.service";
@Injectable({
  providedIn: 'root'
})
export class GuestAuthGuardService {
  constructor(
    private readonly router: Router,
    private readonly authService: AuthService,
  ) {
  }

  public async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    if (!localStorage.getItem(storageKey.token)?.length) {
      this.router.navigate(['login']);
      return false
    } else if (route.queryParamMap.get('accessToken')) {
      const accessTokenRaw = route.queryParamMap.get('accessToken') || '';
      localStorage.setItem(storageKey.token, accessTokenRaw);
      const _userProfile = await this.authService.getOfficerUserByToken()
      if (_userProfile) {
        localStorage.setItem(storageKey.user, JSON.stringify({
          isGuest: true,
          user: {
            id: _userProfile?.officeUser?.id,
            officeUser: {
              ..._userProfile?.officeUser || {}
            }
          }
        }));
        return true
      } else {
        this.router.navigate(['login']);
        return false
      }
    }
    return true;
  }
}
