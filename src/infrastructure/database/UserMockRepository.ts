import {IUserRepository} from "../../core/Repository/user/IUserRepository";
import {User} from "../../core/Entities";
import {IUserListQuery} from "../../core/Repository/user/IUserListQuery";
import {IUserCreate} from "../../core/Repository/user/IUserCreate";
import {UserRole} from "../../core/Entities/UserRole";

export class UserMockRepository implements IUserRepository {
    private users: Map<string, User> = new Map<string, User>();

    create(user: IUserCreate): User {
        const createdUser = new User(user);
        this.users.set(createdUser.id, createdUser);
        return createdUser;
    }

    delete(id: string): User | null {
        const user = this.users.get(id);
        if(user){
            this.users.delete(id);
        }

        return user ?? null;
    }

    find(id: string): User | null {
        return this.users.get(id) ?? null;
    }

    findAll(query: IUserListQuery): User[] {
        const usersWithCondition: User[] = [];

        this.users.forEach(u => {
            let pass = true;

            if(query.filter?.email) pass = u.email === query.filter.email;
            if(query.filter?.phone) pass = u.phone === query.filter.phone;
            if(pass) usersWithCondition.push(u);
        })

        if(!query.pagination){
            return usersWithCondition;
        }

        return usersWithCondition.slice(query.pagination.offset, query.pagination.offset + query.pagination.limit);
    }

    update(id: string, data: Partial<IUserCreate>): User | null {
        const userToUpdate = this.users.get(id);
        if(userToUpdate){
            if(data.email) userToUpdate.email = data.email;
            if(data.phone) userToUpdate.phone = data.phone;
            if(data.name) userToUpdate.name = data.name;
            if(data.passwordHash) userToUpdate.passwordHash = data.passwordHash;
            this.users.set(id, userToUpdate);
        }

        return userToUpdate ?? null;
    }

    findByContact(contact: string, type: "phone" | "email"): User | null {
        let found: User | null = null;

        for (const user of this.users.values()) {
            if(user[type] === contact) {
                found = user;
                break;
            }
        }

        return found;
    }

    sign(id: string, role?:UserRole): boolean {
        const user =  this.users.get(id);
        if(!user) return false;
        if(role && user.role !== role) return false;

        return true;
    }

}
