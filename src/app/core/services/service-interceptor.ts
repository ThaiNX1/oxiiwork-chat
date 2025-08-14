import {inject, Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable, of, Subject, throwError} from 'rxjs';
import {catchError, finalize, takeUntil, tap, timeout} from 'rxjs/operators';
import {CommonService} from './common.service';
import {storageKey} from "../constants/storage-key";
import {ResponseCode} from "../constants/enum";
import {RefreshTokenService} from "../../auth/refresh-token.service";

@Injectable()
export class ServiceInterceptor implements HttpInterceptor {
  listCallingAPI: string[] = [];
  cancelRequests$ = new Subject<void>();
  commonService = inject(CommonService)
  refreshTokenService = inject(RefreshTokenService)

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any> | any> {
    if (this.commonService.cancelRequests$.value) {
      this.cancelRequests$.next();
      return of(null)
    } else {
      this.listCallingAPI.push('request');
      if (!this.commonService.removeShowGlobalLoading.value) {
        this.commonService.setShowGlobalLoading(true);
      }
      let headers = req.headers;
      if (this.commonService.includeHttpHeader.value)
        headers = headers.append('Authorization', 'Bearer ' + localStorage.getItem(storageKey.token));
      const authReq = req.clone({headers});
      const response = next.handle(authReq).pipe(
        tap({
          next: async (event) => {
            this.commonService.setIncludeHttpHeader(true)
            if (event instanceof HttpResponse) {
              if (event?.body?.errors?.[0]?.code?.toString() === ResponseCode.Expired_Token.toString()) {
                this.cancelRequests$.next()
                this.refreshTokenService.refreshToken()
              }else if (event?.body?.errors?.[0]){
                this.commonService.setShowErrorResponse(event?.body?.errors?.[0])
              }
            }
          },
        }),
        takeUntil(this.cancelRequests$),
        timeout(720000),
        catchError(error => {
          this.commonService.setShowErrorResponse(error)
          return throwError(error);
        }),
        finalize(() => {
          this.listCallingAPI.pop();
          if (this.listCallingAPI.length === 0) {
            this.commonService.setShowGlobalLoading(false);
            this.commonService.setRemoveShowGlobalLoading(false)
          }
        })
      );
      return response
    }
  }
}
