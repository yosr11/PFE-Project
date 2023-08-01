import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  devices: Observable<any[]>;
  constructor(private realtime:AngularFireDatabase) {  this.devices = this.realtime.list('devices').valueChanges();}
  getnavigationById(deviceId: string): Observable<any> {
    return this.realtime.object(`/devices/${deviceId}`).valueChanges();
  } 
}
