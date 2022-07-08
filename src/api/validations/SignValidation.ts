import * as Joi from "joi";
import {IValidationSchema} from "./base/IValidationSchema";
import {SignUpCommand} from "../../application/requests/commands/SignUpCommand";
import {PhoneValidation} from "./base/PhoneValidation";
import {PasswordValidation} from "./base/PasswordValidation";


export const SignValidation: IValidationSchema<SignUpCommand> = {
    contact: Joi.alternatives(Joi.string().email(), PhoneValidation),
    password: PasswordValidation
}
