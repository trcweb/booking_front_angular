import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FlightsService {

  apiUrl: string;
  api = 'flights';

  constructor(private http: HttpClient ) {
    this.apiUrl = environment.apiUrl;
  }

  flightOffersSearch(req: Map< string, any>): Observable<any> {
    return this.http.post(`${this.apiUrl}/${this.api}/searchOffers`, req);
  }

  
}
