import { Role } from './Role';

export class Account {
    id_account: number | null;
    role: Role |null;
    email: string | null;
    password: string | null;
    active: boolean | null;
    refreshToken: string | null;

    constructor() {
        this.id_account = null;
        this.role = null;
        this.email = null;
        this.password = null;
        this.active = null;
        this.refreshToken = null;
    }
}