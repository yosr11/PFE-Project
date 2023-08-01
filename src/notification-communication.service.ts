import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationCommunicationService {

  private notification = new BehaviorSubject<any>(null);

  constructor() { }
  setNotification(data: any) {
    console.log('Notification received:', data);
    this.notification.next(data);
  }

  getNotification() {
    
    return this.notification.asObservable();

  }
}

