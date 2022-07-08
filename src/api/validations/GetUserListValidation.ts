import {IValidationSchema} from "./base/IValidationSchema";
import {
    GetUserListConditions,
    GetUserListQuery
} from "../../application/requests/queries/GetUserListQuery";
import {BaseQueryList} from "./base/BaseQueryList";
import * as Joi from "joi";
import {PhoneValidation} from "./base/PhoneValidation";

const GetUserListConditions: IValidationSchema<GetUserListConditions> = {
    email: Joi.string().email(),
    phone: PhoneValidation,
}

export const GetUserListValidation: IValidationSchema<GetUserListQuery> = {
    ...BaseQueryList,
    filter: Joi.object(GetUserListConditions)
}
