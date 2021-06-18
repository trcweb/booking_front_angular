export class HotelBookingRequest {

    offerId: string | null;
    guests: Guest[];
    payments: Payment[];

    constructor() {
        this.offerId = null;
        this.guests = [];
        this.payments = [];
    }

}

export class Name {

    title: string | null;
    firstName: string | null;
    lastName: string | null;

    constructor(){
        this.title = null;
        this.firstName = null;
        this.lastName = null;
    }
}


export class Contact {

    phone: string | null;
    email: string | null;

    constructor(){
        this.phone = null;
        this.email = null;
    }
}


export class Card {

    vendorCode: string | null;
    cardNumber: string | null;
    expiryDate: string | null;

    constructor(){
        this.vendorCode = null;
        this.cardNumber = null;
        this.expiryDate = null;
    }
}


export class Guest {

    name: Name | null;
    contact: Contact | null;

    constructor(){
        this.name = null;
        this.contact = null;
    }
}

export class Payment {

    method: string | null;
    card: Card | null;

    constructor(){
        this.method = null;
        this.card = null;
    }
}

