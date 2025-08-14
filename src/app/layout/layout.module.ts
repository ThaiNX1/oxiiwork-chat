import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {LayoutRoutingModule} from "./layout-routing.module";
import {MaterialModule} from "../core/material.module";
import {RouterOutlet} from "@angular/router";
import {ComponentModule} from "../shared/component.module";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterOutlet,
    MaterialModule,
    LayoutRoutingModule,
    ComponentModule
  ],
  exports: []
})
export class LayoutModule {
}
