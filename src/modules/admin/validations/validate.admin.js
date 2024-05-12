import Joi from "joi";

export const filterSchema = Joi.object({
    body:{},
    params:{},
    query: Joi.object({
       email: Joi.string(),
       username: Joi.string(),
        phone: Joi.string(),
        role: Joi.string(),
    }).or('username', 'email', 'phone','role')  // Requires at least one of the specified keys to be present
});
