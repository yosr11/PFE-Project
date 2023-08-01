import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { HttpClient } from '@angular/common/http';

import 'firebase/database';
@Injectable({
  providedIn: 'root'
})
export class SosService {
  public notificationUrl='http://localhost:3000/subscribe';
  constructor(private realtime:AngularFireDatabase,
              private http:HttpClient,
              ) { }
           
  sendSOS(boitier_imei: number) {
    // Mettre à jour la valeur de "status_sos_1" dans la base de données Firebase
    const path = `devices/${boitier_imei}/status_sos_1`;
    return this.realtime.object(path).set(1);
  }
  sendNotification(notification: any) {
    const url = 'http://localhost:3000/notifications';
    const data = {
      message: notification.message,
      type: 'sos',
      imei: sessionStorage.getItem('boitier_imei').match(/\d+/)[0],
      id_client:  sessionStorage.getItem('id_client').match(/\d+/)[0]
    };
    return this.http.post(url, data);
  }
  
}
