import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AngularFireDatabase } from '@angular/fire/compat/database';
@Injectable({
  providedIn: 'root'
})
export class GeofenceService {


  private apiUrl = 'http://localhost:3000';
  
  devices: Observable<any[]>;
  constructor(private realtime:AngularFireDatabase,
    private http:HttpClient) {  this.devices = this.realtime.list('devices').valueChanges();}
  getgeofenceByImei(deviceId: string): Observable<any> {
    return this.realtime.object(`/devices/${deviceId}`).valueChanges();
  }
//get radius from database
  getRadius(id_bateau:number): Observable<any> {
    console.log('id_bateau:', id_bateau); 
    return this.http.get(`${this.apiUrl}/geofence/${id_bateau}`);
  }
 
}
