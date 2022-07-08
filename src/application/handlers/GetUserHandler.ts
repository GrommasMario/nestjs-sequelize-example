import {Handler, IHandler} from "../common/Mediator";
import {IUserRepository} from "../../core/Repository/user/IUserRepository";
import {Inject} from "@nestjs/common";
import {User} from "../../core/Entities";
import {GetUserQuery} from "../requests/queries/GetUserQuery";
import {EntityNotFoundException} from "../../core/Exceptions/EntityNotFoundException";
import {UserResponse} from "../responses/UserResponse";

@Handler(GetUserQuery)
export class GetUserHandler implements IHandler<GetUserQuery, UserResponse>{

    @Inject("IUserRepository")
    private userRepository!: IUserRepository;

    async handle(request: GetUserQuery): Promise<UserResponse> {
        const user = await this.userRepository.find(request.id);
        if(!user){
            throw new EntityNotFoundException(User);
        }

        return new UserResponse(user);
    }

}
