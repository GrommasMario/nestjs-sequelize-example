import {Module} from "@nestjs/common";
import {MediatrModule} from "../application/common/Mediator";
import {AdminUserController} from "./controllers/AdminUserController";
import {UserController} from "./controllers/UserController";
import {SignController} from "./controllers/SignController";
import {JwtAdminAuthorization, JwtAuthorization} from "./common/JwtAuthorization";
import {DatabaseModule} from "../infrastructure/database/module";
import * as handlers  from '../application/handlers';

@Module({
    imports: [MediatrModule, DatabaseModule],
    providers:[
        JwtAdminAuthorization,
        JwtAuthorization,
        ...Object.values(handlers)
    ],
    controllers: [AdminUserController, UserController, SignController]})
export class StartUpModule{}
