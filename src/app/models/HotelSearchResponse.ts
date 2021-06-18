import { Commission } from './Commission';
import { Dictionarie } from './Dictionarie';
import { NextPage } from './NextPage';
import { HotelOfferResponse } from './HotelOfferResponse';
export class HotelSearchResponse {
    hotelOffers: HotelOfferResponse[];
    nextPage: NextPage;
    dictionarie: Dictionarie;
    commission: Commission;

    constructor() {
        this.hotelOffers = [];
        this.nextPage = new NextPage();
        this.dictionarie = new Dictionarie();
        this.commission = new Commission();
    }
}
