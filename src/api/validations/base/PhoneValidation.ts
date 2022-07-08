import * as Joi from "joi";
import {phone as PhoneValidator} from "phone";

export const PhoneValidation = Joi.string().custom((value, helpers) => {
    const phoneValidated = PhoneValidator(`+${value.replaceAll('+', '').replaceAll(' ', '').replaceAll('-', '')}`);
    if(!phoneValidated.isValid){
        return helpers.error('Phone is incorrect');
    }
    return phoneValidated.phoneNumber;
});
