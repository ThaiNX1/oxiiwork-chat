import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {SelectSearchComponent} from "./components/select-search/select-search.component";
import {MaterialModule} from "../core/material.module";
import {TranslateModule} from "@ngx-translate/core";
import {ReactiveFormsModule} from "@angular/forms";
import {DialogActionComponent} from "./components/dialog-action/dialog-action.component";
import {PreviewLinkComponent} from "./components/preview-link/preview-link.component";

@NgModule({
  declarations: [
    SelectSearchComponent,
    DialogActionComponent,
    PreviewLinkComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    TranslateModule,
    ReactiveFormsModule
  ],
  exports: [
    SelectSearchComponent,
    DialogActionComponent,
    PreviewLinkComponent
  ]
})
export class ComponentModule {
}
