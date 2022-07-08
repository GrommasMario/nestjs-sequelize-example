import {IUserRepository} from "../../core/Repository/user/IUserRepository";
import {User} from "../../core/Entities";
import {IUserListQuery} from "../../core/Repository/user/IUserListQuery";
import {Sequelize} from "sequelize";
import {Inject} from "@nestjs/common";
import {IUserCreate} from "../../core/Repository/user/IUserCreate";
import {UserRole} from "../../core/Entities/UserRole";

export class UserRepository implements IUserRepository{
    @Inject(Sequelize)
    private sequelize!: Sequelize;

    async create(user: IUserCreate): Promise<User> {
        const s = await this.sequelize.models.user.create({...user});

        await s.save();

        return new User(s.toJSON()) as unknown as User;
    }

    async delete(id: string): Promise<User | null> {
        const user = await this.sequelize.models.user.findByPk(id)
        if(user){
            await user.destroy();
        }
        return user as unknown as User;
    }

    async find(id: string): Promise<User | null> {
        return await this.sequelize.models.user.findByPk(id) as unknown as User;
    }

    async findAll(query: IUserListQuery): Promise<User[]> {
        return await this.sequelize.models.user.findAll({
            where: query.filter ?? {},
            limit: query.pagination?.limit,
            offset: query.pagination?.offset
        }) as unknown as User[]
    }

    async update(id: string, data: Partial<IUserCreate>): Promise<User | null> {
        const userToUpdate = await this.sequelize.models.user.findByPk(id)
        if(userToUpdate){
            await userToUpdate.update(data);
        }

        return userToUpdate as unknown as User;
    }

    async findByContact(contact: string, type: "phone" | "email"): Promise<User | null> {
        return await this.sequelize.models.user.findOne({where: {[type]: contact}}) as unknown as User;
    }

    async sign(id: string, role?:UserRole): Promise<boolean> {
        const count = await this.sequelize.models.user.count({where: {id, role}})
        return count > 0;
    }
}
