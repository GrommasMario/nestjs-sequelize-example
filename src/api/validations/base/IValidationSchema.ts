import * as Joi from "joi";

export type IValidationSchema<T> = Required<Record<keyof T, Joi.AnySchema>>;
