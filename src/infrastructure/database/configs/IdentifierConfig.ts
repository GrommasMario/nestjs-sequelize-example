import {Identifier} from "../../../core/Entities/Identifier";
import {DataTypes, ModelAttributeColumnOptions} from "sequelize";

export const IdentifierConfig: Record<keyof Identifier, ModelAttributeColumnOptions> = {
    id: {
        primaryKey: true,
        type: DataTypes.UUID,
        validate: {
            isUUID: 4,
        }
    }
}
