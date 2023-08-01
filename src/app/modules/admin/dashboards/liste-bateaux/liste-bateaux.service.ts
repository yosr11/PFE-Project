import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable } from 'rxjs';
import { PeriodicElement } from './liste-bateaux.component';


@Injectable({
  providedIn: 'root'
})
export class ListeBateauxService {

  constructor(private http:HttpClient) { }
  private apiUrl = 'http://localhost:3000';
  //get Allbateau
  getBateau(): Observable<any> {
    return this.http.get(`${this.apiUrl}/bateau`);
  }

  //get bateau by Id Bateau
  getBateauById(id_bateau:number): Observable<any> {
    return this.http.get(`${this.apiUrl}/boat/${id_bateau}`);
  }

  updateBateau(id_client: number, id_bateau: number, data:any): Observable<PeriodicElement>{
    return this.http.put<PeriodicElement>(`${this.apiUrl}/bateau/update/${id_client}/${id_bateau}`, data);
  }

//get bateau By Id client
  getBateauxByClientId(id_client: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/bateau/${id_client}`);
  }


  DeleteBateau(id_client:number,boitier_imei:number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/bateau/${id_client}/${boitier_imei}/supp`);

  }
}
