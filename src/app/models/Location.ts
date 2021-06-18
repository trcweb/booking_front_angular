
export class Location {
    type: string | null;
    subType: string | null;
    name: string | null;
    detailedName: string | null;
    iataCode: string | null;
    address: Address;

    constructor() {
        this.type = null;
        this.subType = null;
        this.name = null;
        this.detailedName = null;
        this.iataCode = null;
        this.address = new Address();
    }

}

export class Address {
    cityName: string | null;
    countryName: string | null;

    constructor(){
        this.cityName = null;
        this.countryName = null;
    }
}
