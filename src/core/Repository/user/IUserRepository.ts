import {User} from "../../Entities/User";
import {IUserListQuery} from "./IUserListQuery";
import {IUserCreate} from "./IUserCreate";
import {UserRole} from "../../Entities/UserRole";

export interface IUserRepository {
    find(id: string): Promise<User | null> | User | null;
    sign(id: string, role?: UserRole): Promise<boolean> | boolean;
    findByContact(contact: string, type: "phone" | "email"): Promise<User | null> | User | null;
    findAll(query: IUserListQuery): Promise<User[]> | User[];
    update(id: string, data: Partial<IUserCreate>): Promise<User | null> | User | null;
    create(user: IUserCreate): Promise<User> | User;
    delete(id: string): Promise<User | null> | User | null;
}
