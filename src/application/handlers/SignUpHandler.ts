import {Handler, IHandler, Mediatr} from "../common/Mediator";
import {SignUpCommand} from "../requests/commands/SignUpCommand";
import {IUserRepository} from "../../core/Repository/user/IUserRepository";
import {Inject} from "@nestjs/common";
import {User} from "../../core/Entities";
import {randomUUID} from 'crypto';
import * as bcrypt from 'bcrypt';
import {Token} from "../responses/Token";
import {CreateAuthTokenCommand} from "../requests/commands/CreateAuthTokenCommand";
import {createHmac} from "node:crypto";

@Handler(SignUpCommand)
export class SignUpHandler implements IHandler<SignUpCommand, Token>{

    @Inject("IUserRepository")
    private userRepository!: IUserRepository;

    @Inject(Mediatr)
    private mediatr!: Mediatr;

    protected secret: string;

    constructor() {
        const secret = process.env["SECRET_AUTHENTICATION"] ?? null;

        if(secret === null){
            throw new Error('NOT FOUND SECRET_AUTHENTICATION')
        }

        this.secret = secret;
    }

    async handle(request: SignUpCommand) {
        const isPhone: boolean = !request.contact.includes('@') // check is phone
        const passwordHash = await new Promise<string>((resolve, reject) => {
            bcrypt.genSalt((err, salt) => {
                if(err) {
                    reject(err);
                    return;
                }
                console.log(createHmac('sha256', this.secret).update(request.password).digest('hex'))
                bcrypt.hash(createHmac('sha256', this.secret).update(request.password).digest('hex'), salt, (err, encrypted) => {
                    if(err) {
                        reject(err);
                        return;
                    }

                    resolve(encrypted);
                })
            })
        })

        let phone = null;
        let email = null;
        if(isPhone){
            phone = request.contact;
        } else {
            email = request.contact;
        }
        const user = new User({id: randomUUID(), name: null, passwordHash, email, phone})
        await this.userRepository.create(user);

        return this.mediatr.send<Token>(new CreateAuthTokenCommand({user}));
    }

}
