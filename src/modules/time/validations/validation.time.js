import Joi from "joi";

export const addtimeSchema = Joi.object({

        body:{
            day:Joi.string().required(),
            startTime:Joi.string().trim().required(),
            endTime:Joi.string().trim().required(),
            
        },
        params: {},
        query: {},
})
export const getDaysdSchema = Joi.object({
        body:{},
        params: {id :Joi.string().hex().length(24)},
        query: {},
})