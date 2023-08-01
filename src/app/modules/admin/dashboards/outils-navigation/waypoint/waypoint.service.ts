import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WaypointService {

  constructor(private http:HttpClient) { }
  private apiUrl = 'http://localhost:3000';
  
  getwaypointById(id_bateau:number): Observable<any> {
    console.log('id_bateau:', id_bateau); // add this line
    
    return this.http.get<any>(`${this.apiUrl}/waypoint/${id_bateau}`);
  }
}
