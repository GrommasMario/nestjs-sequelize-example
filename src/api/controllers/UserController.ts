import {
    Body,
    Controller,
    Delete,
    Get,
    Inject,
    Patch,
    UseGuards
} from "@nestjs/common";
import {Mediatr} from "../../application/common/Mediator";
import {UserResponse} from "../../application/responses/UserResponse";
import {GetUserQuery} from "../../application/requests/queries/GetUserQuery";
import {UpdateUserCommand} from "../../application/requests/commands/UpdateUserCommand";
import {UpdateUserCommandValidation} from "../validations/UpdateUserCommandValidation";
import {DeleteUserCommand} from "../../application/requests/commands/DeleteUserCommand";
import {JwtAuthorization} from "../common/JwtAuthorization";
import {User} from "../../core/Entities";
import {ApiBearerAuth, ApiBody, ApiResponse} from "@nestjs/swagger";
import {JoiValidationPipe} from "../pipes/JoiValidationPipe";
import {ReqUser} from "../common/ReqUserDecorator";

@ApiBearerAuth()
@UseGuards(JwtAuthorization)
@Controller("user")
export class UserController {

    @Inject(Mediatr)
    private mediator!: Mediatr

    @Get()
    @ApiResponse({type: UserResponse})
    get(
        @ReqUser() user: User,
    ){
        return this.mediator.send<UserResponse>(new GetUserQuery({id: user.id}))
    }

    @Patch()
    @ApiResponse({type: UserResponse})
    @ApiBody({type: UpdateUserCommand})
    update(
        @ReqUser() user: User,
        @Body(new JoiValidationPipe(UpdateUserCommandValidation)) request: Omit<UpdateUserCommand, "id">
    ){
        return this.mediator.send<UserResponse>(new UpdateUserCommand({id: user.id, ...request}))
    }

    @Delete()
    @ApiResponse({type: UserResponse})
    delete(
        @ReqUser() user: User,
    ){
        return this.mediator.send<UserResponse>(new DeleteUserCommand(user.id))
    }
}
