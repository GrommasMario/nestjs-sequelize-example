import {Handler, IHandler} from "../common/Mediator";
import {DeleteUserCommand} from "../requests/commands/DeleteUserCommand";
import {UserResponse} from "../responses/UserResponse";
import {IUserRepository} from "../../core/Repository/user/IUserRepository";
import {Inject} from "@nestjs/common";
import {EntityNotFoundException} from "../../core/Exceptions/EntityNotFoundException";
import {User} from "../../core/Entities";

@Handler(DeleteUserCommand)
export class DeleteUserCommandHandler implements IHandler<DeleteUserCommand, UserResponse>{

    @Inject('IUserRepository')
    private userRepository!: IUserRepository;

    async handle(request: DeleteUserCommand): Promise<UserResponse> {
        console.log(request);
        const user = await this.userRepository.delete(request.id);
        if(!user){
            throw new EntityNotFoundException(User);
        }

        return new UserResponse(user);
    }

}
