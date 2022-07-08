import {ClassProvider} from "@nestjs/common";
import {UserMockRepository} from "./UserMockRepository";
import {UserRepository} from "./UserRepository";

export const IUserRepositoryProvider: ClassProvider = {provide: "IUserRepository", useClass: process.env['NODE_ENV'] !== "test" ? UserRepository : UserMockRepository };

export const AllRepositoryInjectors = [
    IUserRepositoryProvider,
]
