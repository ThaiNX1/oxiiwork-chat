import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {GuestChatComponent} from "./guest-chat/guest-chat.component";
import {ConversationCreateComponent} from "./mobile/conversation-create/conversation-create.component";
import { OfficeCMSComponent } from "../office-cms/office-cms.component";
import { MailComponent } from "../mail/mail.component";

const routes: Routes = [
  {
    path: '',
    component: GuestChatComponent,
  },
  {
    path: 'chat',
    component: GuestChatComponent,
  },
  {
    path: 'chat/mobile/create-conversation',
    component: ConversationCreateComponent,
  },
  {
    path: 'chat/mobile/info-conversation',
    component: ConversationCreateComponent,
  },
  {
    path: 'office',
    component: OfficeCMSComponent,
  },
  {
    path: 'mail',
    component: MailComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GuestRoutingModule {
}
