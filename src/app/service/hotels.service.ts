import { HotelBookingRequest } from './../models/HotelBookingRequest';
import { Observable } from 'rxjs';
import { HotelSearchResponse } from './../models/HotelSearchResponse';
import { NextPage } from './../models/NextPage';
import { environment } from './../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HotelsService {

  apiUrl: string;
  api = 'hotels';

  constructor(private http: HttpClient ) {
    this.apiUrl = environment.apiUrl;
  }

  searchOffers(cityCode: string | null,
               checkInDate: string | null,
               checkOutDate: string | null,
               rooms: string | null,
               priceRange: string | null,
               ratings: string | null,
               nextPage: NextPage): Observable<HotelSearchResponse> {
    const params = new HttpParams();
    if (ratings !== null) {
      params.append('ratings', ratings);
    }
    if (priceRange !== null) {
      params.append('priceRange', priceRange);
    }
    return this.http.post<HotelSearchResponse>(
                                                `${this.apiUrl}/${this.api}/searchOffers/${cityCode}/${checkInDate}/${checkOutDate}/${rooms}`,
                                                  nextPage,
                                                  {params});
  }

  hotelOfferSearch(hotelId: string, checkInDate: string, checkOutDate: string, rooms: string): Observable<HotelSearchResponse> {
    return this.http.get<HotelSearchResponse>(`${this.apiUrl}/${this.api}/hotelOfferSearch/${hotelId}/${checkInDate}/${checkOutDate}/${rooms}`);
  }

  hotelOfferAvailibility(offerId: string): Observable<HotelSearchResponse> {
    return this.http.get<HotelSearchResponse>(`${this.apiUrl}/${this.api}/hotelOfferAvailibility/${offerId}`);
  }

  bookOffer(bookingRequest: HotelBookingRequest): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${this.api}/hotel-booking`, bookingRequest);
  }
}
