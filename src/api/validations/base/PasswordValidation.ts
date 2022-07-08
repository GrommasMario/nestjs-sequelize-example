import * as Joi from "joi";

export const PasswordValidation = Joi.string().min(8).max(256)
