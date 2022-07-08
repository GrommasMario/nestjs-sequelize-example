import {FactoryProvider, Module} from "@nestjs/common";
import {Sequelize, Dialect} from "sequelize";
import SeqUserConfig from "./SeqUserEntityConfig";
const Provider: FactoryProvider = {
    provide: Sequelize,
    useFactory: async () => {
        if(process.env['NODE_ENV'] === 'test'){
            return undefined;
        }

        const sequelize = new Sequelize({
            dialect: process.env["DATABASE_DIALECT"] as Dialect ?? "postgres",
            host: process.env["DATABASE_HOST"] ?? "localhost",
            port: Number(process.env["DATABASE_PORT"]) ?? 5432,
            username: process.env["DATABASE_USERNAME"] ?? "username",
            password: process.env["DATABASE_PASSWORD"] ?? "password",
            database: process.env["DATABASE_NAME"] ?? "database",
        });
        [SeqUserConfig].forEach(cb => cb(sequelize));
        await sequelize.sync();
        return sequelize;
    }

}

@Module({providers: [Provider], exports: [Provider]})
export class SequelizeModule{}
