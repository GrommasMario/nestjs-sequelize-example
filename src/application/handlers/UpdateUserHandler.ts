import {Handler, IHandler} from "../common/Mediator";
import {IUserRepository} from "../../core/Repository/user/IUserRepository";
import {Inject} from "@nestjs/common";
import {UserResponse} from "../responses/UserResponse";
import {UpdateUserCommand} from "../requests/commands/UpdateUserCommand";

@Handler(UpdateUserCommand)
export class UpdateUserHandler implements IHandler<UpdateUserCommand, UserResponse | null>{

    @Inject("IUserRepository")
    private userRepository!: IUserRepository;

    async handle(request: UpdateUserCommand): Promise<UserResponse | null> {
        const {id, ...toUpdate} = request;
        return this.userRepository.update(id, toUpdate);
    }

}
