import {CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException} from "@nestjs/common";
import * as bcrypt from "bcrypt";
import {IUserRepository} from "../../core/Repository/user/IUserRepository";
import {EntityNotFoundException} from "../../core/Exceptions/EntityNotFoundException";
import {User} from "../../core/Entities";
import { createHmac } from 'node:crypto';

@Injectable()
export class JwtAuthentication implements CanActivate {
    protected secret: string;

    @Inject("IUserRepository")
    private userRepository!: IUserRepository

    constructor() {
        const secret = process.env["SECRET_AUTHENTICATION"] ?? null;

        if(secret === null){
            throw new Error('NOT FOUND SECRET_AUTHENTICATION')
        }

        this.secret = secret;
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();

        let authorization = request.headers['authorization'];
        if(!authorization) throw new UnauthorizedException();

        authorization = Buffer.from(authorization.split(' ')[1], 'base64').toString();

        const [contact, password] = authorization.split(':');
        if(!contact || !password) throw new UnauthorizedException();

        let type: "email" | "phone" = "phone";
        if(contact.includes("@")){
            type = "email";
        }

        const user = await this.userRepository.findByContact(contact, type);

        if(!user) throw new EntityNotFoundException(User);

        const passwordHmacHash = createHmac('sha256', this.secret).update(password).digest('hex');
        const passPassword = await bcrypt.compare(passwordHmacHash, user.passwordHash);

        if(!passPassword) throw new EntityNotFoundException(User);

        if (!user) throw new UnauthorizedException();

        Object.assign(request, { user });

        return true;
    }
}
