import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import{Observable} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class HistoriqueService {

  
  constructor(private http:HttpClient) { }
  private apiUrl = 'http://localhost:3000';
  //get Allbateau
  getTrajet(imei:number,date): Observable<any> {
   
    return this.http.get(`${this.apiUrl}/history/${imei}/${date}`);
   
  }
  getDate(imei: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/history/${imei}`);
  }
}
