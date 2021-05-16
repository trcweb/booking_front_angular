export class Room {
    id: number | null;
    type: string | null;
    bedType: string | null;
    nbrPersonnes: number | null;
    availableCount: number | null;
    requestedCount: number | null;

    constructor() {
        this.id = null;
        this.type = null;
        this.bedType = null;
        this.nbrPersonnes = null;
        this.availableCount = null;
        this.requestedCount = null;

    }
}