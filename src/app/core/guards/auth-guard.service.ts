import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Router, RouterStateSnapshot} from '@angular/router';
import {storageKey} from "../constants/storage-key";
import {AuthService} from "../../auth/auth.service";
import { CryptoUtils } from '../utils/crypto-ultils';
@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {
  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
  ) {
  }

  public async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    if (localStorage.getItem(storageKey.token)?.length) {
      return true
    } else if (route.queryParamMap.get('accessToken')) {
      const accessTokenRaw = route.queryParamMap.get('accessToken') || '';
      
      // Xử lý accessTokenRaw để đảm bảo token hợp lệ
      // let accessToken = decodeURIComponent(accessTokenRaw)
      //   .trim()
      //   .replace(/\s+/g, '') // Remove all whitespace
      //   .replace(/[^\w+/=]/g, ''); // Remove any non-base64 characters
      
      // Giải mã token và lưu vào localStorage
      // const decryptedToken = CryptoUtils.decryptToken(accessToken);
      localStorage.setItem(storageKey.token, accessTokenRaw);
      
      // Lấy thông tin người dùng
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
    } else if (!localStorage.getItem(storageKey.token)?.length) {
      this.router.navigate(['login']);
      return false
    } else {
      // const user = this.storageService.getObject(storageKey.user)
      // const notificationStatus = user?.settings?.find((item: any) => item.optionItem?.code === UserSettingCode.SOCIALNETWORK_NOTIFICATION)
      // this.homeService.audioMessageStatus.next(notificationStatus?.value === 'true')
      // const iamPermissions = this.storageService.getObject(storageKey.iamPermission)
      // if (state.url && !state.url?.includes('error/403') && state.url !== '/admin' && iamPermissions?.length){
      //   const _checkPermission = permission.menus.find((_menu) => iamPermissions.includes(_menu.code) && state.url.includes(_menu.url))
      //   if (!_checkPermission)
      //     this.router.navigate(['error/403']).then()
      // }
    }
    return true;
  }
}
