import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogImageViewerComponent } from '../components/dialog-image-viewer/dialog-image-viewer.component';

@Directive({
  selector: '[viewImage]'
})
export class ViewImageDirective {
  @Input() urls: unknown;
  @Input() type: unknown;

  constructor(
    private readonly element: ElementRef,
    public readonly dialog: MatDialog
  ) { }

  @HostListener('click')
  public onClick(): void {
    this.dialog.open(DialogImageViewerComponent, {
      data: { type: this.type, urls: this.urls },
      id: 'dialog-view-image',
      height: '95vh',
      width: '95vw',
      minWidth: '90vw'
    });
  }
}
