import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {GuestRoutingModule} from "./guest-routing.module";
import {MaterialModule} from "../../core/material.module";
import {GuestChatComponent} from './guest-chat/guest-chat.component';
import {AngularSplitModule} from "angular-split";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ComponentModule} from "../../shared/component.module";
import {SharedModule} from "../../shared/shared.module";
import {NgxVirtualScrollModule} from "@lithiumjs/ngx-virtual-scroll";
import {InfiniteScrollDirective} from "ngx-infinite-scroll";
import {HammerModule} from "@angular/platform-browser";
import {ConversationCreateComponent} from "./mobile/conversation-create/conversation-create.component";
import {ConversationInfoComponent} from "./mobile/conversation-info/conversation-info.component";
import {NgxPrintModule} from "ngx-print";
import {TranslateModule} from "@ngx-translate/core";
import { ConversationItemComponent } from "./guest-chat/conversation-item/conversation-item.component";
import { ConversationDetailComponent } from "./guest-chat/conversation-detail/conversation-detail.component";

@NgModule({
  declarations: [
    GuestChatComponent,
    ConversationCreateComponent,
    ConversationInfoComponent,
    ConversationItemComponent,
    ConversationDetailComponent
  ],
    imports: [
        CommonModule,
        GuestRoutingModule,
        MaterialModule,
        AngularSplitModule,
        ReactiveFormsModule,
        FormsModule,
        ComponentModule,
        SharedModule,
        NgxVirtualScrollModule,
        InfiniteScrollDirective,
        HammerModule,
        NgxPrintModule,
        TranslateModule
    ],
})
export class GuestModule {
}
