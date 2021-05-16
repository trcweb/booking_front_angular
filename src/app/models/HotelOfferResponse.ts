import { HotelResponse } from './HotelResponse';
import { OfferResponse } from './OfferResponse';

export class HotelOfferResponse {
    hotel: HotelResponse | null;
    offers: OfferResponse | null;
    source: string | null;

    constructor() {
        this.hotel = null;
        this.offers = null;
        this.source = null;
    }
}
