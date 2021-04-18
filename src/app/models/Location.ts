
export class Location {
    type: string;
    subType: string;
    name: string;
    detailedName: string;
    iataCode: string;
    address: Address;

    constructor(type: string,
                subType: string,
                name: string,
                detailedName: string,
                iataCode: string,
                address: Address) {
        this.type = type;
        this.subType = subType;
        this.name = name;
        this.detailedName = detailedName;
        this.iataCode = iataCode;
        this.address = address;
    
    }

}

export class Address {
    cityName: string;
    countryName: string;


    constructor(cityName: string, countryName: string){
        this.cityName = cityName;
        this.countryName = countryName;
    }
}