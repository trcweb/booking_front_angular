import { Account } from './Account';
export class User {
    cin: string | null;
    num_passport: string | null;
    name: string | null;
    lastname: string | null;
    date_naissance: string | null;
    account: Account | null;

    constructor() {
        this.cin = null;
        this.num_passport = null;
        this.name = null;
        this.lastname = null;
        this.date_naissance = null;
        this.account = null;
    }
}
