import Joi from "joi";
export const addreviewSchema = Joi.object({
        body:{
            rating: Joi.number().required(),
            comment: Joi.string().trim()
        },
        params: {doctorId :Joi.string().hex().length(24).required()},
        query: {},
})