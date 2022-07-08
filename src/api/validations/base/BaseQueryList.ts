import * as Joi from "joi";

export const BaseQueryList = {
    pagination: Joi.object({
        limit: Joi.number().integer().positive().allow(0).optional(),
        offset: Joi.number().integer().positive().allow(0).optional(),
    }).optional(),
}
