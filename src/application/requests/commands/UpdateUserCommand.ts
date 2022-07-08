import {ApiProperty} from "@nestjs/swagger";

export class UpdateUserCommand {
    id: string;
    @ApiProperty({ type: String, required: false })
    name?: string;
    @ApiProperty({ type: String, required: false })
    email?: string;
    @ApiProperty({ type: String, required: false })
    phone?: string;
    @ApiProperty({ type: String, required: false })
    password?: string;

    constructor(init: UpdateUserCommand) {
        this.id = init.id;
        this.name = init.name;
        this.email = init.email;
        this.phone = init.phone;
        this.password = init.password;
    }
}
