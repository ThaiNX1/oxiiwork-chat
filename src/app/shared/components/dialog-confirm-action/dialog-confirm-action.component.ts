import {
  Component,
  EventEmitter,
  Inject,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {takeUntil} from "rxjs/operators";
import {Subject} from "rxjs";
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {TranslateModule} from "@ngx-translate/core";
import {MatButton} from "@angular/material/button";
import {NgTemplateOutlet} from "@angular/common";

@Component({
  selector: 'app-dialog-confirm-action',
  templateUrl: './dialog-confirm-action.component.html',
  styleUrls: ['./dialog-confirm-action.component.scss'],
  imports: [
    TranslateModule,
    MatDialogContent,
    MatDialogTitle,
    MatDialogActions
  ],
  standalone: true
})
export class DialogConfirmActionComponent implements OnInit, OnDestroy, OnChanges {
  @Input() setting: DialogConfirmActionSetting | undefined
  @Input() isShowConfirm: boolean | undefined;
  @Output() submit = new EventEmitter();
  @Output() closeConfirm = new EventEmitter();
  @Output() delete = new EventEmitter();
  $unSubscribe = new Subject()
  dialogRef: any

  constructor(
    private sanitizer: DomSanitizer,
    public dialog: MatDialog
  ) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.isShowConfirm)
      this.openModal({
        ...this.setting,
        message: this.sanitizer.bypassSecurityTrustHtml(this.setting?.message || '')
      })
    else
      this.dialogRef?.close()
  }

  ngOnInit(): void {
  }

  openModal(data: any): void {
    this.dialogRef = this.dialog.open(DialogConfirmTemplateComponent,
      {
        data: data
      }
    )

    this.dialogRef.afterClosed().pipe(takeUntil(this.$unSubscribe)).subscribe((result: any) => {
      this.isShowConfirm = false;
      this.closeConfirm.emit(result);
    });
  }

  ngOnDestroy(): void {
    this.$unSubscribe.complete();
  }
}

@Component({
  selector: 'app-dialog-confirm-template',
  templateUrl: './dialog-confirm-template.component.html',
  standalone: true,
  imports: [
    TranslateModule,
    MatDialogContent,
    MatDialogActions,
    MatDialogTitle,
    MatButton,
    MatDialogClose,
    NgTemplateOutlet
  ]
})
export class DialogConfirmTemplateComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogConfirmTemplateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
  }
}

export interface DialogConfirmActionSetting {
  header: string
  message?: string
  btnOK?: string
  btnCancel?: string
  btnDelete?: string
}
