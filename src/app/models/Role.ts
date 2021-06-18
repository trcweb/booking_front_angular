import { Commission } from './Commission';
export class Role {

    id_role: number | null;
    name: string | null;
    commission: Commission | null;

    constructor() {
        this.id_role = null;
        this.name = null;
        this.commission = null;
    }
}