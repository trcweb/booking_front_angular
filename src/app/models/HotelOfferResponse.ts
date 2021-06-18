import { HotelResponse } from './HotelResponse';
import { OfferResponse } from './OfferResponse';

export class HotelOfferResponse {
    hotel: HotelResponse | null;
    offers: OfferResponse[];
    source: string | null;

    constructor() {
        this.hotel = null;
        this.offers = [];
        this.source = null;
    }
}
