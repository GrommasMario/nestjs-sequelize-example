import {CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException} from "@nestjs/common";
import * as jwt from "jsonwebtoken";
import {IUserRepository} from "../../core/Repository/user/IUserRepository";

@Injectable()
export class JwtAuthorization implements CanActivate {
    protected secret = process.env["SECRET_JWT"] ?? "";

    @Inject("IUserRepository")
    private userRepository!: IUserRepository

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();

        const authorization = request.headers['authorization'];
        if(!authorization)  throw new UnauthorizedException();

        const token = authorization.split(' ')[1];
        if(!token) throw new UnauthorizedException();

        let tokenData: string | jwt.JwtPayload | null = null;
        try {
            tokenData = jwt.verify(token, this.secret);
        } catch (e) {
            throw new UnauthorizedException();
        }

        if (typeof tokenData === 'string' || !tokenData?.userId) {
            console.warn(`Unauthorized JWT Token`, 'Auth-Strategy');

            throw new UnauthorizedException();
        }

        const user = await this.userRepository.sign(tokenData.userId)

        if (!user) throw new UnauthorizedException();

        Object.assign(request, { userId: tokenData.userId });
        return true;
    }
}

export class JwtAdminAuthorization extends JwtAuthorization implements CanActivate {
    protected override secret = process.env["ADMIN_SECRET_JWT"] ?? "";
}

