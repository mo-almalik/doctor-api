import Joi from "joi";

export const updateSchema = Joi.object({

        body:{
            username:Joi.string(),
            email:Joi.string(),
            DOB:Joi.string(),
            gender:Joi.string(),
            phone:Joi.string(),
        },
        params: {},
        query: {},
})
export const AppointmentCanceledSchema = Joi.object({
        body:{},
        params: {id :Joi.string().hex().length(24)},
        query: {},
})


