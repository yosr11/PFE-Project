import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ClientServiceService {
    private readonly API_URL = 'http://localhost:3000'; 

    constructor(private _http: HttpClient) {}

    
    getConnectedClientId(email,password): Observable<number> {
        return this._http.get<number>(`${this.API_URL}/client/${email}/${password}`);
    }
}
