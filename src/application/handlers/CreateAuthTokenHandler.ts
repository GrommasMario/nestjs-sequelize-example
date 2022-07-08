import {Handler, IHandler} from "../common/Mediator";
import {CreateAuthTokenCommand} from "../requests/commands/CreateAuthTokenCommand";
import {Token} from "../responses/Token";
import * as jwt from "jsonwebtoken";


@Handler(CreateAuthTokenCommand)
export class CreateAuthTokenHandler implements IHandler<CreateAuthTokenCommand, Token>{
    async handle(request: CreateAuthTokenCommand): Promise<Token> {
        const payload = {
            userId: request.user.id,
            role: request.user.role
        }
        const secret = process.env["SECRET_JWT"] ?? null;

        if(!secret) throw new Error('Secret not found');

        const accessToken = jwt.sign(payload, secret);

        return new Token({access: accessToken});
    }


}
