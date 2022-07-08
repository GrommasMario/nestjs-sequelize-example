import {Handler, IHandler} from "../common/Mediator";
import {IUserRepository} from "../../core/Repository/user/IUserRepository";
import {Inject} from "@nestjs/common";
import {UserResponse} from "../responses/UserResponse";
import {GetUserListQuery} from "../requests/queries/GetUserListQuery";

@Handler(GetUserListQuery)
export class GetUserListHandler implements IHandler<GetUserListQuery, UserResponse[]>{

    @Inject("IUserRepository")
    private userRepository!: IUserRepository;

    async handle(request: GetUserListQuery): Promise<UserResponse[]> {
        const users = await this.userRepository.findAll(request);

        return users.map(user => new UserResponse(user))
    }

}
