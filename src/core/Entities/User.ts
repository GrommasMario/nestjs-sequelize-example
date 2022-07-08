import {Identifier} from "./Identifier";
import {UserRole} from "./UserRole";
import {PartPartial} from "../types";

type UserConstructor = PartPartial<User, 'role'>;

export class User extends Identifier {
    name: string | null = null;
    role: UserRole;
    phone: string | null = null;
    email: string | null = null;
    passwordHash!: string;

    constructor(init: UserConstructor) {
        super(init.id);
        this.name = init.name;
        this.phone = init.phone;
        this.email = init.email;
        this.passwordHash = init.passwordHash;

        if (init.role !== undefined) this.role = init.role;
        else this.role = UserRole.CLIENT;
    }
}
