
import { Injectable } from '@angular/core';
import { Notification } from './notifications.types';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';
@Injectable({
    providedIn: 'root'
  })
  export class NotificationsService {
    private notifications = new BehaviorSubject<Notification[]>([]);

  constructor() { }

  getNotifications() {
    return this.notifications.asObservable();
  }

  addNotification(notification: Notification) {
    const currentNotifications = this.notifications.getValue();
    currentNotifications.unshift(notification);
    this.notifications.next(currentNotifications);
  }
 }
  