import {User} from "../../../core/Entities";

export class CreateAuthTokenCommand {
    user: User;

    constructor(init: CreateAuthTokenCommand) {
        this.user = init.user;
    }
}
