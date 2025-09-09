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
import {takeUntil} from "rxjs/operators";

@Component({
  selector: 'app-dialog-action',
  templateUrl: './dialog-action.component.html',
  styleUrls: ['./dialog-action.component.scss'],
})
export class DialogActionComponent implements OnChanges, OnDestroy {
  @Input() setting!: DialogActionSetting
  @Input() isShowDialog: boolean = false
  @Input() showHeader: boolean = true
  @Output() submit = new EventEmitter()
  @Output() close = new EventEmitter()
  @Output() delete = new EventEmitter()
  $unSubscribe = new Subject()
  dialogRef: any

  constructor(
    private sanitizer: DomSanitizer,
    private dialog: MatDialog
  ) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.isShowDialog)
      this.openModal(this.setting)
    else
      this.dialogRef?.close()
  }

  openModal(data: any): void {
    this.dialogRef = this.dialog.open(DialogActionTemplateComponent,
      {
        data: {
          ...data,
          showHeader: this.showHeader
        },
        maxHeight: '80vh'
      }
    )

    this.dialogRef.afterClosed().pipe(takeUntil(this.$unSubscribe)).subscribe((result: any) => {
      this.isShowDialog = false;
      this.close.emit(result);
    });

    this.dialogRef.componentInstance.closeEvent.subscribe((result: any) => {
      this.close.emit(result);
    });
  }

  ngOnDestroy(): void {
    this.$unSubscribe.complete();
  }
}

@Component({
  selector: 'app-dialog-template',
  templateUrl: './dialog-action-template.component.html',
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
export class DialogActionTemplateComponent {
  @Output() closeEvent = new EventEmitter<any>();
  constructor(
    public dialogRef: MatDialogRef<DialogActionTemplateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
  }
}

export class DialogActionSetting {
  header?: string
  btnOK?: string
  btnCancel?: string
  btnDelete?: string
  submit?: string
  template?: any
  templateCode?: string
}
