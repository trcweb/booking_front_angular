import { HotelSearchResponse } from './../../models/HotelSearchResponse';
import { HotelsService } from './../../service/hotels.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs/operators';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-detailoffre',
  templateUrl: './detailoffre.component.html',
  styleUrls: ['./detailoffre.component.css']
})
export class DetailoffreComponent implements OnInit {

  hotelSearchResponse: HotelSearchResponse | null = null;
  star = '★';
  fetching: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  css = of('');

  constructor(private hotelsService: HotelsService,
              private scroller: ViewportScroller,
              private router: Router,
              private activeRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    const hotelId = this.activeRoute.snapshot.params.id;
    const query = this.activeRoute.snapshot.queryParamMap;
    const checkInDate = query.get('checkInDate');
    const checkOutDate = query.get('checkOutDate');
    const rooms = query.get('rooms');
    const cityCode = query.get('cityCode');
    this.fetching.next(true);
    this.loadEffect();
    this.hotelsService.hotelOfferSearch(hotelId, checkInDate!, checkOutDate!, rooms!).subscribe(
      {
        next: data => {
          console.log(data);
          this.hotelSearchResponse = data;
          this.fetching.next(false); },
        error : err => {
          this.fetching.next(false);
          console.log(err);
        },
        complete: () => {
          this.fetching.next(false);
        }
      }
    );
  }

  loadEffect(): void {
    this.fetching.subscribe({
      next: fetch => {
        const gallery = document.getElementsByName('gallery') as NodeListOf<HTMLElement>;
        const stars = document.getElementById('rating') as HTMLElement;
        if (fetch) {
          stars.classList.add('animated-background-x');
          stars.classList.add('loading2');
          gallery.forEach(
            element => {
              element.classList.add('animated-background-x');
              element.classList.add('loading3');
            }
          );
        } else {
          gallery.forEach(
            element => {
              element.classList.remove('animated-background-x');
              element.classList.remove('loading3');
            }
          );
          stars.classList.remove('animated-background-x');
          stars.classList.remove('loading2');
        }
      }
    });
  }

  scroll(ref: string): void {
    this.scroller.scrollToAnchor(ref);
  }

  reserver(offerId: string): void {
    const hotelName = this.hotelSearchResponse?.hotelOffers[0].hotel?.nom;
    const stars = this.hotelSearchResponse?.hotelOffers[0].hotel?.nbr_etoile;
    const cover = this.hotelSearchResponse?.hotelOffers[0].hotel?.media[0];
    const checkInDate = this.activeRoute.snapshot.queryParamMap.get('checkInDate');
    const checkOutDate = this.activeRoute.snapshot.queryParamMap.get('checkOutDate');
    this.router.navigate([`/hotels/reserver/${offerId}`], { queryParams: { hotelName, stars, cover, checkInDate, checkOutDate } });
  }

}
