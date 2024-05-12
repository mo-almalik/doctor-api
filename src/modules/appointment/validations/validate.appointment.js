import Joi from "joi";

export const addAppointmentSchema = Joi.object({
        body:{
            name:Joi.string().required(),
            phone:Joi.string().required(),
            time:Joi.string().hex().length(24).required(),
            gender:Joi.string().required(),
          
        },
        params: {
         id :Joi.string().hex().length(24)
        },
        query: {},
})

export const filterSchema = Joi.object({
    body:{},
    params:{},
    query: Joi.object({
        visitNo: Joi.string(),
        status: Joi.string(),
        phone: Joi.string()
    }).or('visitNo', 'status', 'phone')  // Requires at least one of the specified keys to be present
});

