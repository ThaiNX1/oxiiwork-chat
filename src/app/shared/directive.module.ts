import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {MyTemplateDirective} from "./directives/my-template.directive";
import {AutoTabDirective} from "./directives/auto-tab.directive";
import {FocusElementDirective} from "./directives/focus.directive";
import {ViewImageDirective} from "./directives/view-image.directive";
import {HtmlTooltipDirective} from "./directives/tooltip-html.directive";
import {MentionEditorDirective} from "./directives/mention-editor.directive";
@NgModule({
  declarations: [
    MyTemplateDirective,
    AutoTabDirective,
    FocusElementDirective,
    ViewImageDirective,
    HtmlTooltipDirective,
    MentionEditorDirective
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
    MentionEditorDirective
  ]
})
export class DirectiveModule {
}
