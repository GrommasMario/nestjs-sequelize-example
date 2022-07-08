export class Token {
    access: string;

    constructor(init: Token) {
        this.access = init.access;
    }
}
