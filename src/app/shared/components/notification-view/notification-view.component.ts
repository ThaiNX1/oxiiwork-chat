import {Component, Inject} from '@angular/core';
import {MAT_SNACK_BAR_DATA, MatSnackBarModule} from "@angular/material/snack-bar";
import {MatIconModule} from "@angular/material/icon";

@Component({
  selector: 'app-notification-view',
  standalone: true,
  imports: [
    MatSnackBarModule,
    MatIconModule
  ],
  templateUrl: './notification-view.component.html',
  styleUrl: './notification-view.component.scss'
})
export class NotificationViewComponent {
  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public data: NotificationData
  ) {
  }
}

export class NotificationData {
  type?: string
  icon?: string
  title: string = ''
  body: string = ''
}
