import {User} from "../../../core/Entities";
import {DataTypes, ModelAttributeColumnOptions, Sequelize} from "sequelize";
import {IdentifierConfig} from "./IdentifierConfig";

const ConfigUser: Record<keyof User, ModelAttributeColumnOptions> = {
    ...IdentifierConfig,
    role: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    name: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    email: {
        type: DataTypes.TEXT,
        allowNull: true,
        validate: {
            isEmail: true
        }
    },
    phone: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    passwordHash: {
        type: DataTypes.TEXT,
    },
}

export default (s: Sequelize) => {
    s.define("user", ConfigUser);
}
