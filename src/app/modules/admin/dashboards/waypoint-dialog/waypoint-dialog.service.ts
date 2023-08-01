import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {  Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class WaypointDialogService {

  constructor(
    private http:HttpClient
  ) { }
  private apiUrl = 'http://localhost:3000';
  getwaypointById(id_bateau:number): Observable<any> {
    return this.http.get(`${this.apiUrl}/waypoint/${id_bateau}`);
  }
}
