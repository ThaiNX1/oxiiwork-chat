import {Injectable, Injector, signal} from "@angular/core";
import {BehaviorSubject} from "rxjs";
import {MatSnackBar} from "@angular/material/snack-bar";
import {TranslateService} from "@ngx-translate/core";
import {
  NotificationData,
  NotificationViewComponent
} from "../../shared/components/notification-view/notification-view.component";

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  showGlobalLoading = new BehaviorSubject(true)
  removeShowGlobalLoading = new BehaviorSubject(false)
  showErrorResponse = new BehaviorSubject(null)
  includeHttpHeader = new BehaviorSubject(true)
  menus = new BehaviorSubject([])
  cancelRequests$ = new BehaviorSubject<boolean>(false);
  smallScreen = signal(false)
  fullScreen = signal(false)
  openSlideNav = signal(false)
  slideNavConfig = signal<any>(null)

  constructor(
    private readonly _snackBar: MatSnackBar,
    private injector: Injector,
  ) {
  }

  setShowGlobalLoading(value: boolean) {
    this.showGlobalLoading.next(value)
  }

  setRemoveShowGlobalLoading(value: boolean) {
    this.removeShowGlobalLoading.next(value)
  }

  setIncludeHttpHeader(value: boolean) {
    this.includeHttpHeader.next(value)
  }

  setShowErrorResponse(error: any) {
    this.showErrorResponse.next({...error})
  }

  /**
   * Show snackbar
   * @param message
   */
  public openSnackBar(messageKey: string): void {
    this.injector.get(TranslateService).get(messageKey).subscribe((value) => {
      this._snackBar.open(value, '', {
        duration: 4000,
        horizontalPosition: 'end',
        verticalPosition: this.smallScreen() ? 'top' : 'bottom',
        panelClass: 'bg-snackbar-success'
      });
    })
  }

  public openSnackBarCustom(data: NotificationData): void {
    this._snackBar.openFromComponent(NotificationViewComponent, {
      duration: 3000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: 'snackbar-custom',
      data: data
    });
  }

  public openSnackBarError(messageKey: string): void {
    this.injector.get(TranslateService).get(messageKey).subscribe((value) => {
      this._snackBar.open(value, '', {
        duration: 4000,
        horizontalPosition: 'end',
        verticalPosition: this.smallScreen() ? 'top' : 'bottom',
        panelClass: 'bg-snackbar-error'
      });
    })
  }


  /** Random */
  getShortName(fullName: string): string {
    let shotName = ''
    if (fullName) {
      const names = fullName?.trim()?.split(' ')?.reduce((arr: any, curr) => {
        arr.push(curr?.trim())
        return arr
      }, []) || []
      shotName = names?.length === 1
        ? names?.[0]?.substr(0, 1)
        : names?.[0]?.substr(0, 1) + names?.[names.length - 1]?.substr(0, 1)
    }
    return shotName.toUpperCase()
  }

  randomColor(exceptColor?: string): string {
    let color = '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')
    if (exceptColor && color?.toUpperCase() === exceptColor?.toUpperCase())
      return this.randomColor(exceptColor)
    else
      return color.toString()
  }
}
