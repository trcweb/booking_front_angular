import { User } from './User';
import { UserAgence } from './UserAgence';
export class AuthResponse {
    token: string | null;
    refreshToken: string | null;
    userAgence: UserAgence | null;
    user: User | null;
    role: string | null;

    constructor() {
        this.token = null;
        this.refreshToken = null;
        this.userAgence = null;
        this.user = null;
        this.role = null;
    }
}
