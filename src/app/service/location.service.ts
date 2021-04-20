import { Location } from './../models/Location';
import { environment } from './../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  apiUrl: string;
  headers = new HttpHeaders()
                            .set('content-type', 'application/json')
                            .set('Access-Control-Allow-Origin', '*');

  constructor(private http: HttpClient ) {
    this.apiUrl = environment.apiUrl;
  }

  searchLocation(searchTearm: string, subType: string): Observable<Location[]> {
    return this.http.get<Location[]>(`${this.apiUrl}/hotels/airport-cities-search/${searchTearm}/${subType}`, { headers: this.headers });
  }
}
