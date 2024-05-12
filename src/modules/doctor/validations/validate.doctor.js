import Joi from "joi";

export const updateSchema = Joi.object({
        body:{
           username:Joi.string(),
           gender:Joi.string(),
            email:Joi.string(),
            // password:Joi.string(),
            location:Joi.string(),
            bio:Joi.string(),
            specialization:Joi.string(),
            price:Joi.number(),
            DOB:Joi.string(),
            phone:Joi.number(),
            profilePhoto:Joi.object(),
           
        },
        params: {},
        query: {},
        file:{
                profilePhoto:Joi.object(),
        }
})
export const DocotrInfoSchema = Joi.object({
        body:{},
        params: {id :Joi.string().hex().length(24)},
        query: {},
})
export const statusSchema = Joi.object({
        body:{
            stats:Joi.string().trim().required(),
            id :Joi.string().hex().length(24)
        },
        params: {},
        query: {},
})


export const filterSchema = Joi.object({
        body:{},
        params:{},
        query: Joi.object({
            visitNo: Joi.string(),
            status: Joi.string(),
            phone: Joi.string(),
            name: Joi.string(),
        }).or('visitNo', 'status', 'phone' ,'name')  // Requires at least one of the specified keys to be present
    });
    