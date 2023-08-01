import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class EditGeofenceService {
  private apiUrl = 'http://localhost:3000';
  constructor(private http:HttpClient) { }
  //modifier radius
  updategeofence(id_bateau:number,geofence:any): Observable<any> {
    return this.http.put(`${this.apiUrl}/geofence/update/${id_bateau}`,geofence);
  }
  getGeofence(id_bateau:number): Observable<any> {
    
    return this.http.get(`${this.apiUrl}/geofence/${id_bateau}`);
  }
}
