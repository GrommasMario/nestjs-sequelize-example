import {Body, Controller, Inject, Post, UseGuards} from "@nestjs/common";
import {Mediatr} from "../../application/common/Mediator";
import {UserResponse} from "../../application/responses/UserResponse";
import {SignValidation} from "../validations/SignValidation";
import {SignUpCommand} from "../../application/requests/commands/SignUpCommand";
import {ApiBasicAuth, ApiResponse} from "@nestjs/swagger";
import {JoiValidationPipe} from "../pipes/JoiValidationPipe";
import {SerializationPipe} from "../pipes/Serialization";
import {JwtAuthentication} from "../common/JwtAuthentication";
import {User} from "../../core/Entities";
import {CreateAuthTokenCommand} from "../../application/requests/commands/CreateAuthTokenCommand";
import {ReqUser} from "../common/ReqUserDecorator";

@Controller("sign")
export class SignController {
    @Inject(Mediatr)
    private mediator!: Mediatr

    @Post("up")
    @ApiResponse({type: UserResponse})
    signUp(
        @Body(
            new SerializationPipe(SignUpCommand),
            new JoiValidationPipe(SignValidation),
        ) request: SignUpCommand
    ) {
        return this.mediator.send(request);
    }

    @Post("in")
    @ApiResponse({type: UserResponse})
    @UseGuards(JwtAuthentication)
    @ApiBasicAuth()
    signIn(
        @ReqUser() user: User,
    ) {
        return this.mediator.send(new CreateAuthTokenCommand({user}));
    }
}
