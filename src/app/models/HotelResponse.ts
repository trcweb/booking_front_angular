export class HotelResponse {
    id_hotel: | null;
    nbr_etoile: number | null;
    nom: | null;
    addresse: | null;
    pays: | null;
    ville_code_iata: | null;
    description: | null;
    amenities: string[];
    media: string[];
    fix: | null;
    fax: | null;
    mobile: | null;
    responsable_hotel: | null;
    email_responsable: | null;
    email_hotel: | null;
    etat_hotel: | null;

    constructor() {
        this.id_hotel = null;
        this.nbr_etoile = null;
        this.nom = null;
        this.addresse = null;
        this.pays = null;
        this.ville_code_iata = null;
        this.description = null;
        this.amenities = [];
        this.media = [];
        this.fix = null;
        this.fax = null;
        this.mobile = null;
        this.responsable_hotel = null;
        this.email_responsable = null;
        this.email_hotel = null;
        this.etat_hotel = null;
    }
}