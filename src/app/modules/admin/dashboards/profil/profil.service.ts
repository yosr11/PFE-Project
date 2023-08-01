import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ProfilService {
  private apiUrl = 'http://localhost:3000';
  constructor(private http:HttpClient) { }
  

  getProfile(id_client: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/client/${id_client}`);
  }
  editProfile(id_client: number, client:any): Observable<any>{
    return this.http.put(`${this.apiUrl}/client/update/${id_client}`, client);
  }

}
