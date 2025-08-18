import { Component, ElementRef, HostListener, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { MaterialModule } from "../../../core/material.module";
import { DialogImageViewerType } from "../../../core/constants/enum";
import { saveAs } from "file-saver";
import * as _ from "lodash";

@Component({
  selector: 'app-dialog-image-viewer',
  standalone: true,
  imports: [
    MaterialModule,
  ],
  templateUrl: './dialog-image-viewer.component.html',
  styleUrl: './dialog-image-viewer.component.scss'
})
export class DialogImageViewerComponent {
  DialogImageViewerType = DialogImageViewerType
  imageSelectedIndex = 0

  constructor(
    public dialogRef: MatDialogRef<DialogImageViewerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogImageViewerData,
  ) {
  }

  /** Image */
  currentRotate = 0
  currentScale = 0.8
  styleScale = 'scale(0.8)'

  // Pan state
  tx = 0;
  ty = 0;
  private dragging = false;
  private lastX = 0;
  private lastY = 0;
  @ViewChild('imgEl') imgRef!: ElementRef<HTMLImageElement>;
  @ViewChild('viewer') viewerRef!: ElementRef<HTMLDivElement>;
  ngAfterViewInit() {
    // Căn giữa ban đầu sau khi view dựng xong
    setTimeout(() => this.centerIfNotZoomed(), 0);
  }

  @HostListener('window:resize')
  onResize() {
    this.centerIfNotZoomed();
  }

  /** Sự kiện load ảnh */
  onImageLoaded() {
    this.centerIfNotZoomed();
  }
  /** Getter transform cho template */
  get imageTransform(): string {
    // Thứ tự: translate -> rotate -> scale
    return `translate(${this.tx}px, ${this.ty}px) rotate(${this.currentRotate}deg) scale(${this.currentScale})`;
  }

  onCloseDialog() {
    this.dialogRef?.close()
  }

  /** Image */
  reset() {
    this.currentScale = 0.5
    this.currentRotate = 0
    this.styleScale = `scale(${this.currentScale}); rotate(${this.currentRotate}deg)`
  }

  zoomOut() {
    this.currentScale -= 0.2
    this.styleScale = `scale(${Math.max(this.currentScale, 0.3)})`
    if (this.currentScale <= 0.5) {
      // chốt về 1 và căn giữa
      this.currentScale = 0.5;
      this.centerIfNotZoomed();
    }
  }

  zoomIn() {
    this.currentScale += 0.2
    this.styleScale = `scale(${Math.min(this.currentScale, 3)})`
  }

  rotateImage(degree: number) {
    this.currentRotate += degree
    this.styleScale = `rotate(${this.currentRotate}deg)`
  }

  openInNewTab() {
    window.open(this.data?.urls?.[this.imageSelectedIndex], '_blank')
  }

  download() {
    fetch(this.data?.urls?.[this.imageSelectedIndex]).then((res) => {
      res.blob().then((blob) => {
        saveAs(blob, _.last(this.data?.urls?.[this.imageSelectedIndex].split('/')))
      })
    }).catch((err) => {
    })
  }
  /** Drag – Mouse */
  onMouseDown(e: MouseEvent) {
    // Chỉ drag khi đã zoom > 1 (tuỳ bạn, có thể bỏ điều kiện)
    if (this.currentScale <= 0.5) return;
    e.preventDefault();
    this.dragging = true;
    this.lastX = e.clientX;
    this.lastY = e.clientY;
  }

  onMouseMove(e: MouseEvent) {
    if (!this.dragging) return;
    const dx = e.clientX - this.lastX;
    const dy = e.clientY - this.lastY;
    this.tx += dx;
    this.ty += dy;
    this.lastX = e.clientX;
    this.lastY = e.clientY;
  }

  onMouseUp() { this.dragging = false; }
  onMouseLeave() { this.dragging = false; }

  /** Drag – Touch */
  onTouchStart(ev: TouchEvent) {
    if (this.currentScale <= 0.5) return;
    // if (ev.touches.length !== 1) return;
    this.dragging = true;
    this.lastX = ev.touches[0].clientX;
    this.lastY = ev.touches[0].clientY;
  }

  onTouchMove(ev: TouchEvent) {
    if (!this.dragging || ev.touches.length !== 1) return;
    ev.preventDefault(); // ngăn scroll
    const dx = ev.touches[0].clientX - this.lastX;
    const dy = ev.touches[0].clientY - this.lastY;
    this.tx += dx;
    this.ty += dy;
    this.lastX = ev.touches[0].clientX;
    this.lastY = ev.touches[0].clientY;
  }

  onTouchEnd() { this.dragging = false; }

  /** Ngăn drag ảnh mặc định của browser */
  onNativeDragStart(e: DragEvent) { e.preventDefault(); }

  /** --------- Căn giữa khi không zoom --------- */
  private centerIfNotZoomed() {
    if (this.currentScale <= 1) this.centerImage();
  }

  private centerImage() {
    const viewer = this.viewerRef?.nativeElement;
    const img = this.imgRef?.nativeElement;
    if (!viewer || !img) return;

    const naturalW = img.naturalWidth || img.width;
    const naturalH = img.naturalHeight || img.height;

    // Kích thước sau scale
    const w = naturalW * this.currentScale;
    const h = naturalH * this.currentScale;

    // Tính hộp bao sau rotate (deg -> rad)
    const rad = ((this.currentRotate % 360) + 360) % 360 * Math.PI / 180;
    const cos = Math.cos(rad), sin = Math.sin(rad);
    const boxW = Math.abs(w * cos) + Math.abs(h * sin);
    const boxH = Math.abs(w * sin) + Math.abs(h * cos);

    // Căn giữa: transform-origin 0 0
    this.tx = (viewer.clientWidth - boxW) / 2;
    this.ty = (viewer.clientHeight - boxH) / 2;
  }
}

export type DialogImageViewerData = {
  type: DialogImageViewerType
  urls: string[]
}
