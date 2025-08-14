import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {getLinkPreview} from "link-preview-js";
import {CommonService} from "../../../core/services/common.service";

@Component({
  selector: 'app-preview-link',
  templateUrl: './preview-link.component.html',
  styleUrl: './preview-link.component.scss'
})
export class PreviewLinkComponent implements OnInit, OnChanges {
  @Input() link: string = ''
  previewData: any = null

  constructor(
    private commonService: CommonService
  ) {
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.link?.length)
      getLinkPreview(`https://proxy.corsfix.com/?${this.link}`).then((data) => {
        this.previewData = data
      }).catch((err) => {
        this.previewData = null
      })
  }
}
