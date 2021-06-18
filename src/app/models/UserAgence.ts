import { Account } from './Account';
export class UserAgence {
    id_agence: number | null;
    account: Account | null;
    matricule_fiscale: string | null;
    registre_commerce: string | null;
    raison_social: string | null;
    adresse_agence: string | null;
    mobile_agence: string | null;

    constructor() {
        this.id_agence = null;
        this.account = null;
        this.matricule_fiscale = null;
        this.registre_commerce = null;
        this.raison_social = null;
        this.adresse_agence = null;
        this.mobile_agence = null;
    }
}