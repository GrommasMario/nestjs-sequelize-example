import {
    Body,
    Controller,
    Delete,
    Get,
    Inject,
    Param,
    Patch,
    Query, UseGuards,
} from "@nestjs/common";
import {Mediatr} from "../../application/common/Mediator";
import {UserResponse} from "../../application/responses/UserResponse";
import {GetUserQuery} from "../../application/requests/queries/GetUserQuery";
import {GetUserListQuery} from "../../application/requests/queries/GetUserListQuery";
import {UpdateUserCommand} from "../../application/requests/commands/UpdateUserCommand";
import {UpdateUserCommandValidation} from "../validations/UpdateUserCommandValidation";
import {GetUserListValidation} from "../validations/GetUserListValidation";
import {DeleteUserCommand} from "../../application/requests/commands/DeleteUserCommand";
import {ApiBody, ApiResponse} from "@nestjs/swagger";
import {ApiImplicitQuery} from "@nestjs/swagger/dist/decorators/api-implicit-query.decorator";
import {JoiValidationPipe} from "../pipes/JoiValidationPipe";
import {SerializationPipe} from "../pipes/Serialization";
import {JwtAdminAuthorization} from "../common/JwtAuthorization";

@UseGuards(JwtAdminAuthorization)
@Controller("admin/user")
export class AdminUserController {

    @Inject(Mediatr)
    private mediator!: Mediatr

    @Get()
    @ApiResponse({type: [UserResponse]})
    @ApiImplicitQuery({name: "pagination[limit]", required: false})
    @ApiImplicitQuery({name: "pagination[offset]", required: false})
    @ApiImplicitQuery({name: "filter[phone]", required: false})
    @ApiImplicitQuery({name: "filter[email]", required: false})
    getList(
        @Query(new SerializationPipe(GetUserListQuery), new JoiValidationPipe(GetUserListValidation)) query?: unknown,
    ){
        return this.mediator.send<UserResponse>(query);
    }

    @Get(":id")
    @ApiResponse({type: UserResponse})
    get(@Param("id") id: string){
        return this.mediator.send<UserResponse>(new GetUserQuery({id}))
    }

    @Patch(":id")
    @ApiResponse({type: UserResponse})
    @ApiBody({type: UpdateUserCommand})
    update(
        @Param("id") id: string,
        @Body(new JoiValidationPipe(UpdateUserCommandValidation)) request: Omit<UpdateUserCommand, "id">
    ){
        return this.mediator.send<UserResponse>(new UpdateUserCommand({id, ...request}), )
    }

    @Delete(":id")
    @ApiResponse({type: UserResponse})
    delete(
        @Param("id") id: string,
    ){
        return this.mediator.send<UserResponse>(new DeleteUserCommand(id))
    }
}
