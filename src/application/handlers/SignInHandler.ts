import {Handler, IHandler} from "../common/Mediator";
import {SignUpCommand} from "../requests/commands/SignUpCommand";
import {IUserRepository} from "../../core/Repository/user/IUserRepository";
import {Inject} from "@nestjs/common";
import {User} from "../../core/Entities";
import {SignInCommand} from "../requests/commands/SignInCommand";
import {EntityNotFoundException} from "../../core/Exceptions/EntityNotFoundException";
import {UserResponse} from "../responses/UserResponse";

@Handler(SignInCommand)
export class SignInHandler implements IHandler<SignUpCommand, UserResponse>{

    @Inject("IUserRepository")
    private userRepository!: IUserRepository;

    async handle(request: SignUpCommand) {
        let type: "email" | "phone" = "phone";
        if(request.contact.includes("@")){
            type = "email";
        }
        const user = await this.userRepository.findByContact(request.contact, type);

        if(!user) throw new EntityNotFoundException(User);

        const passPassword = true; // functional for checking hash password;
        if(!passPassword) throw new EntityNotFoundException(User);

        return new UserResponse(user);
    }

}
