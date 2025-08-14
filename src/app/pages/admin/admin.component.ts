import {Component, OnInit} from '@angular/core';
import {AdminService} from "./admin.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent implements OnInit {
  menu: any = {};

  constructor(
    private readonly adminService: AdminService,
    // private readonly commonService: CommonService,
    private readonly router: Router,
  ) {
  }

  async ngOnInit() {
    await Promise.all([
      this.getAdminInfo(),
      // this.telesaleZaloService.login(),
      // this.telesaleService.initializeJsSIP()
    ])
  }

  async getAdminInfo() {
    // await Promise.all([this.adminService.getProfile(), this.adminService.getIamAccessPermission()])
    //   .then(async ([profileResponse, iamResponse]) => {
    //     const menu = _.groupBy(iamResponse?.statement?.Menus, 'parentCode');
    //     let menuList: any = {};
    //     let _accessMenuCodes = [];
    //     if (menu) {
    //       Object.keys(menu).map((key) => {
    //         if (key === 'null') {
    //           menu[key].map((item: any) => {
    //             menuList = {
    //               ...menuList,
    //               [item.code]: item
    //             };
    //           });
    //         } else {
    //           menuList = {
    //             ...menuList,
    //             [key]: {
    //               code: key,
    //               description: menu[key]?.[0]?.description,
    //               name: this.getParentMenuName(key),
    //               parentCode: null
    //             }
    //           };
    //           menu[key].map((item: any) => {
    //             menuList[key][item.code] = item;
    //             _accessMenuCodes.push(item.code);
    //             if (item.code?.includes(constant.menuKey.INCIDENT) &&
    //               !_accessMenuCodes.includes(constant.menuKey.INCIDENT))
    //               _accessMenuCodes.push(constant.menuKey.INCIDENT);
    //           });
    //         }
    //       });
    //     }
    // let hasSocial = [IamPermissionAction.facebook_management, IamPermissionAction.zalo_management, IamPermissionAction.zalo_view, IamPermissionAction.facebook_view].some(item => this.homeService.permissionActions.getValue().includes(item));
    // if (hasSocial) {
    //   let socialNetworkResponse = await this.telesaleService.getSocialNetworkOverview();
    //   if (socialNetworkResponse) {
    //     _accessMenuCodes.push(constant.menuKey.MESSAGE);
    //     let menuMessage = {
    //       [constant.menuKey.MESSAGE]: {
    //         code: constant.menuKey.MESSAGE,
    //         description: '',
    //         name: 'Giao tiếp khách hàng',
    //         parentCode: null,
    //         children: []
    //       }
    //     };
    //     let socialNetworkChildren: any = _.groupBy(socialNetworkResponse?.data, 'provider');
    //     if (!this.checkPermission([IamPermissionAction.zalo_view, IamPermissionAction.zalo_management])) {
    //       delete socialNetworkChildren.Zalo
    //     }
    //     if (!this.checkPermission([IamPermissionAction.facebook_view, IamPermissionAction.facebook_management])) {
    //       delete socialNetworkChildren.Facebook
    //     }
    //     const menuMessageChildren = [];
    //     Object.keys(socialNetworkChildren).map((key) => {
    //       let unreadCount = 0;
    //       let listPage = socialNetworkChildren[key]?.reduce((pages, child) => {
    //         unreadCount += (child?.metadata?.unreadCount || 0);
    //         pages.push({
    //           code: child?.provider?.toUpperCase(),
    //           description: '',
    //           name: child?.name,
    //           parentCode: child?.provider?.toUpperCase(),
    //           unreadCount: child?.metadata?.unreadCount,
    //           socialNetworkId: child?.metadata?.socialNetworkId || '',
    //           id: child?.id || '',
    //           provider: child.provider
    //         });
    //         return pages;
    //       }, []) || [];
    //       listPage = [
    //         {
    //           code: key?.toUpperCase(),
    //           description: '',
    //           name: 'Tất cả',
    //           parentCode: key?.toUpperCase(),
    //           unreadCount: unreadCount,
    //           socialNetworkId: '',
    //           id: '',
    //           provider: key
    //         },
    //         ...listPage
    //       ];
    //       menuMessageChildren.push({
    //         code: key.toUpperCase(),
    //         description: '',
    //         name: key == 'Chatwoot' ? 'Live Chat' : key,
    //         parentCode: constant.menuKey.MESSAGE,
    //         unreadCount: unreadCount,
    //         id: '',
    //         provider: key,
    //         children: listPage
    //       });
    //     });
    //     menuMessage[constant.menuKey.MESSAGE].children = menuMessageChildren;
    //     // menuMessage[constant.menuKey.MESSAGE].children = socialNetworkResponse?.data?.reduce((arr, currentValue) => {
    //     //     arr.push({
    //     //         code: currentValue?.provider?.toUpperCase(),
    //     //         description: '',
    //     //         name: currentValue?.provider,
    //     //         parentCode: constant.menuKey.MESSAGE,
    //     //         unreadCount: currentValue?.metadata?.unreadCount,
    //     //         id: currentValue?.id,
    //     //         provider: currentValue.provider
    //     //     })
    //     //     return arr
    //     // }, []) || []
    //     if (menuMessageChildren?.length) {
    //       menuList = {
    //         ...menuList,
    //         ...menuMessage
    //       };
    //     }
    //   }
    // }
    // this.menu = menuList;
    // this.localStorageSv.setObject(storageKey.menuView, this.menuDict);
    // this.localStorageSv.setObject(storageKey.menuConfigs, this.menuList);
    // this.localStorageSv.setObject(storageKey.iamPermission, _accessMenuCodes)
    // if (this.router.url === '/home') {
    //   this.getDefaultPageView();
    // }
    // }).catch(err => {
    // this.commonService.showErrorResponse({error_message: err?.message});
    // this.auth.handleLogout();
    // this.router.navigate(['../login']);
    // });
  }
}
