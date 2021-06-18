export class AuthRequest {
    email: string | null;
    password: string | null;

    constructor() {
        this.email = null;
        this.password = null;
    }
}