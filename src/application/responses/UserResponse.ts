import {ApiProperty} from "@nestjs/swagger";

export class UserResponse {
    @ApiProperty()
    id: string;
    @ApiProperty({type: String, nullable: true})
    name: string | null;
    @ApiProperty({type: String, nullable: true})
    email: string | null;
    @ApiProperty({type: String, nullable: true})
    phone: string | null;

    constructor(init: UserResponse) {
        this.id = init.id;
        this.name = init.name;
        this.email = init.email;
        this.phone = init.phone;
    }
}
