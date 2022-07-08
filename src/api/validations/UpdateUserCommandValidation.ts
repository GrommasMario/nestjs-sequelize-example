import {IValidationSchema} from "./base/IValidationSchema";
import {UpdateUserCommand} from "../../application/requests/commands/UpdateUserCommand";
import * as Joi from "joi";
import {PhoneValidation} from "./base/PhoneValidation";
import {PasswordValidation} from "./base/PasswordValidation";

export const UpdateUserCommandValidation: IValidationSchema<Omit<UpdateUserCommand, "id">> = {
    name: Joi.string(),
    email: Joi.string().email().optional(),
    phone: PhoneValidation.optional(),
    password: PasswordValidation.optional()
}
