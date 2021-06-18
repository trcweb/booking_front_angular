import { Room } from './Room';

export class OfferResponse {
    id: string | null;
    roomQuantity: number | null;
    boardType: string | null;
    rooms: Room[];
    guests: number | null;
    currency: string | null;
    base: number | null;
    total: number | null;
    paymentType: string | null;
    cancellationDeadline: string | null;
    cancellationAmmount: number | null;

    constructor() {
        this.id = null;
        this.roomQuantity = null;
        this.boardType = null;
        this.rooms = [];
        this.guests = null;
        this.currency = null;
        this.base = null;
        this.total = null;
        this.paymentType = null;
        this.cancellationDeadline = null;
        this.cancellationAmmount = null;
    }
}
