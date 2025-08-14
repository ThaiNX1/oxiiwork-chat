import {Component, effect, inject, OnInit, signal} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {TranslateService} from "@ngx-translate/core";
import DisableDevtool from 'disable-devtool';
import {CommonService} from "./core/services/common.service";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
// import {AngularFireMessaging, AngularFireMessagingModule} from "@angular/fire/compat/messaging";
import {ComponentModule} from "./shared/component.module";
import {
  DialogConfirmActionComponent,
  DialogConfirmActionSetting
} from "./shared/components/dialog-confirm-action/dialog-confirm-action.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MatProgressSpinner,
    // AngularFireMessagingModule,
    ComponentModule,
    DialogConfirmActionComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'SOffice17';
  isLoading = signal(false)

  /** Error */
  isShowGlobalError = false
  confirmSetting: DialogConfirmActionSetting = {
    message: '',
    header: 'COMMON.LABEL.ERROR_RESPONSE',
    btnOK: '',
    btnCancel: 'COMMON.BUTTON.CLOSE'
  }

  commonService = inject(CommonService)
  translateService = inject(TranslateService)
  // afMessaging = inject(AngularFireMessaging)

  constructor() {
    this.translateService.setDefaultLang('vi');
    this.commonService.showGlobalLoading.subscribe((value) => {
      this.isLoading.set(value)
    })

    this.commonService.showErrorResponse.subscribe((error: any) => {
      if (error)
        this.translateService.get(error.message).subscribe((mess) => {
          this.confirmSetting.message = mess
          this.isShowGlobalError = true;
        })
    })
    // document.onload = () => {
    //   const preLoading = document.getElementById('pre-loading');
    //   // if (preLoading && document.readyState === 'complete') {
    //   //   preLoading.remove();
    //   // } else{
    //     const timeout = setTimeout(() => {
    //       preLoading?.remove();
    //       clearTimeout(timeout);
    //     }, 300);
    //   // }
    // }
    // effect(() => {
    //   if (this.commonService.smallScreen()) {
    //     const preLoading = document.querySelector('#pre-loading');
    //     preLoading?.remove();
    //   } else{
    //     // console.log('not smallScreen')
    //   }
    // })
    // window.onload = (e) => {
    //   const preLoading = document.querySelector('#pre-loading');
    //   if (preLoading && document.readyState === 'complete') {
    //     preLoading.remove();
    //   }
    //   const timeout = setTimeout(() => {
    //     preLoading?.remove();
    //     clearTimeout(timeout);
    //   }, 300);
    // }
  }

  ngOnInit(): void {
  }

  /**
   * Close web when open dev tool in browser
   */
  suspendDevTool(): void {
    DisableDevtool({
      url: 'about:blank'
    })
    // @ts-ignore
    window.oncontextmenu = (ev: any) => {
      ev.preventDefault()
    }
    // @ts-ignore
    document.onkeydown = (event: any) => {
      if (event.key === 'F12') {
        event.preventDefault();
        return
      }

      // Chặn Ctrl + Shift + I (DevTools)
      if (event.ctrlKey && event.shiftKey && event.key === 'I') {
        event.preventDefault();
        return;
      }

      // Chặn Ctrl + Shift + J (DevTools)
      if (event.ctrlKey && event.shiftKey && event.key === 'J') {
        event.preventDefault();
        return;
      }
    }
  }
}
