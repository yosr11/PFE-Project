import { Component,ViewChild ,OnInit} from '@angular/core';
import { NotificationsService } from './notifications.service';
import { Notification } from './notifications.types';
import { Observable } from 'rxjs';

@Component({
  selector: 'notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})

  export class NotificationsComponent {
    notifications: Notification[];

    constructor(private notificationsService: NotificationsService) { }
  
    ngOnInit() {
      this.notificationsService.getNotifications().subscribe(notifications => {
        this.notifications = notifications;
      });
    }
    }
  