export class Pagination {
    limit: number = 50;
    offset: number = 0;

    constructor(init?: Partial<Pagination>) {
        if(init?.limit !== undefined && !isNaN(init?.limit)) this.limit = init.limit;
        if(init?.offset !== undefined && !isNaN(init?.offset)) this.offset = init.offset;
    }
}

