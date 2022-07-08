import {ApiProperty} from "@nestjs/swagger";

export class SignInCommand {
    @ApiProperty({type: String, example: 'contact@mail.com'})
    contact: string;
    @ApiProperty({type: String, example: '12345678'})
    password: string;

    constructor(init: SignInCommand) {
        this.contact = init.contact;
        this.password = init.password;
    }
}
