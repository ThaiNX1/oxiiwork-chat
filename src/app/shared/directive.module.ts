import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {MyTemplateDirective} from "./directives/my-template.directive";
import {AutoTabDirective} from "./directives/auto-tab.directive";
import {FocusElementDirective} from "./directives/focus.directive";
import {ViewImageDirective} from "./directives/view-image.directive";
import {HtmlTooltipDirective} from "./directives/tooltip-html.directive";
import {MentionEditorDirective} from "./directives/mention-editor.directive";
import { LongPressDirective } from "./directives/app-long-press.directive";
@NgModule({
  declarations: [
    MyTemplateDirective,
    AutoTabDirective,
    FocusElementDirective,
    ViewImageDirective,
    HtmlTooltipDirective,
    MentionEditorDirective,
    LongPressDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    MyTemplateDirective,
    AutoTabDirective,
    FocusElementDirective,
    ViewImageDirective,
    HtmlTooltipDirective,
    MentionEditorDirective,
    LongPressDirective
  ]
})
export class DirectiveModule {
}
