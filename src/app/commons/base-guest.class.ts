import {AfterViewInit, Component, inject, QueryList, TemplateRef, ViewChild, ViewChildren} from "@angular/core";
import {CommonService} from "../core/services/common.service";
import {storageKey} from "../core/constants/storage-key";
import {DialogConfirmActionSetting} from "../shared/components/dialog-confirm-action/dialog-confirm-action.component";
import {FormGroup} from "@angular/forms";
import {DialogActionSetting} from "../shared/components/dialog-action/dialog-action.component";
import {MyTemplateDirective} from "../shared/directives/my-template.directive";
import {DialogImageViewerType} from "../core/constants/enum";

@Component({
  template: '',
})
export abstract class BaseGuestClass implements AfterViewInit {
  @ViewChild('headerTemplate', {static: false}) headerTemplate!: TemplateRef<any>;
  @ViewChild('slideNavTemplate') slideNavTemplate!: TemplateRef<any>;
  @ViewChildren(MyTemplateDirective) templateRefList?: QueryList<MyTemplateDirective>;
  DialogImageViewerType = DialogImageViewerType
  filterForm!: FormGroup
  /** Logged user */
  user: any = null

  /** Popup confirm */
  visibleConfirmDialog = false
  confirmSetting: DialogConfirmActionSetting = {header: ''}

  /** Popup add/edit */
  addEditForm!: FormGroup
  visibleAddEditDialog = false
  addEditDialogSetting: DialogActionSetting = {header: ''}

  /** Other popup add/edit */
  otherDialogs: any = {}

  /** Common service */
  commonService = inject(CommonService)

  ngAfterViewInit(): void {
    this.commonService.slideNavConfig.set({
      ...this.commonService.slideNavConfig(),
      template: this.slideNavTemplate,
      headerTemplate: this.headerTemplate
    })
    this.user = JSON.parse(localStorage.getItem(storageKey.user) || '')?.user

    const _addEditTemplate = this.templateRefList?.find((_tmp) => _tmp.tempCode === this.addEditDialogSetting.templateCode)
    this.addEditDialogSetting = {
      ...this.addEditDialogSetting,
      template: _addEditTemplate?.template
    }

    Object.keys(this.otherDialogs).map((_dialogTemplateCode) => {
      const _template = this.templateRefList?.find((_tmp) => _tmp.tempCode === _dialogTemplateCode)
      this.otherDialogs[_dialogTemplateCode] = {
        ...this.otherDialogs[_dialogTemplateCode],
        template: _template?.template
      }
    })
  }

  /** Popup confirm */
  onCloseConfirmDialog(event: any) {
    this.visibleConfirmDialog = event
  }

  async onSubmitConfirmDialog() {
  }

  /** Popup add/edit */
  async onSubmitAddEditDialog() {
  }

  async onCloseAddEditDialog(event: any) {
    this.visibleAddEditDialog = false
  }
}
