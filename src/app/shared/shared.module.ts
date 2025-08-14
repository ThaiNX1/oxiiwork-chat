import {NgModule} from "@angular/core";
import {ComponentModule} from "./component.module";
import {DirectiveModule} from "./directive.module";
import {PipesModule} from "./pipes.module";

@NgModule({
  imports: [
    ComponentModule,
    DirectiveModule,
    PipesModule
  ],
  exports: [
    ComponentModule,
    DirectiveModule,
    PipesModule
  ]
})
export class SharedModule {
}
