import {createParamDecorator, ExecutionContext} from "@nestjs/common";
import {Mediatr} from "../../application/common/Mediator";
import {GetUserQuery} from "../../application/requests/queries/GetUserQuery";

export const ReqUser = createParamDecorator(
    async (data: unknown, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();
        return request.user ?? await new Mediatr().send(new GetUserQuery({id: request.userId}));
    },
);
