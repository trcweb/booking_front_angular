import { environment } from './../../environments/environment';
import { Location } from './../models/Location';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class LocationService {
 
  apiUrl: string;
  constructor(private http: HttpClient
  ) {
    this.apiUrl = environment.apiUrl;
                  }
  
  
  searchAutoComplete(searchTerm: string, subType: string) {
    return this.http.get<Location[]>(`${this.apiUrl}/hotels/airport-cities-search/${searchTerm}/${subType}`);
  }



}
