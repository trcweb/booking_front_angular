import { HotelBookingRequest, Guest, Name, Contact, Card, Payment } from './../../models/HotelBookingRequest';
import { HotelSearchResponse } from './../../models/HotelSearchResponse';
import { HotelsService } from './../../service/hotels.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {

  hotelSearchResponse: HotelSearchResponse | null = null;
  star = '★';
  offerId = '';
  cover = '';
  hotelName = '';
  stars = 3;
  checkInDate = '';
  checkOutDate = '';
  client = '';
  lastName = '';
  email = '';
  phone = '';
  title = 'MR';
  cardName = '';
  cardNumber = '';
  cardVendor = '';
  cardExp = '';
  logo: string | undefined = undefined;
  cardCodes = new Map();


  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private hotelsService: HotelsService) {

    this.cardCodes = new Map([
      ['mastercard', 'CA'],
      ['visa', 'VI'],
      ['dinersclub', 'DC'],
      ['discover', 'DS'],
      ['jcb', 'JC'],
      ['maestro', 'MA'],
      ['unionpay', 'UP']
    ]);

  }

  ngOnInit(): void {
    this.offerId = this.activatedRoute.snapshot.params.id;
    const query = this.activatedRoute.snapshot.queryParamMap;
    this.hotelName = query.get('hotelName')!;
    this.stars = parseInt(query.get('stars')!);
    this.cover = query.get('cover')!;
    this.checkInDate = query.get('checkInDate')!;
    this.checkOutDate = query.get('checkOutDate')!;
    this.loadOffer(this.offerId);
  }

  loadOffer(id: string): void {
    this.hotelsService.hotelOfferAvailibility(id).subscribe({
      next: data => {
        this.hotelSearchResponse = data;
        console.log('data: ', data);
      },
      error: er => {
       alert('une erreur est survenue dans le serveur \n veuillez réinitialiser la recherche');
       this.router.navigate(['/hotels']);

      }
    });
  }

  submit(): void {
    if (this.cardVendor && this.cardVendor !== '') {
      const booking = new HotelBookingRequest();
      const g = new Guest();
      const n = new Name();
      const c = new  Contact();
      const cd = new Card();
      const p = new Payment();
      // name
      n.firstName = this.client;
      n.lastName = this.lastName;
      n.title = this.title;
      // contact
      c.email = this.email;
      c.phone = this.phone;
      // guest
      g.contact = c;
      g.name = n;
      // card
      cd.cardNumber = this.cardNumber.replace(/\s/g, '');
      console.log('num', cd.cardNumber);
      cd.expiryDate = this.cardExp;
      cd.vendorCode = this.cardVendor;
      // payment
      p.card = cd;
      p.method = 'creditCard';
      // booking
      booking.guests = [g];
      booking.offerId = this.offerId;
      booking.payments = [p];

      this.hotelsService.bookOffer(booking).subscribe({
        next: data => {
          console.log('booking: ', data);
          const bookingOrder = data;
          this.router.navigate(['/hotels/booked'], {state: {data: bookingOrder, guest: g}});
        },
        error: err => {
          console.log('booking error: ', err);
          alert('une erreur est survenue lors de la creation de reservation \n veuillez initialiser votre recherche');
          this.router.navigate(['/hotels']);
        }
      });
    }
  }

  tr(t: Observable<string>): string {
    t.subscribe({
      next: type => {
        this.logo = type;
        this.cardVendor = this.cardCodes.get(type);
      }
    }).unsubscribe();
    return '';
  }

}
