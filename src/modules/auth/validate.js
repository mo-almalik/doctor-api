import Joi from "joi";

export const registerSchema= Joi.object({
    body:{
        username:Joi.string().required(),
        email:Joi.string().required(),
        password:Joi.string().required(),
        phone:Joi.number().required(),
    },
    params: {},
	query: {},
     
})

export const loginSchema= Joi.object({
    body:{
        
        email:Joi.string().required(),
        password:Joi.string().required(),
    },
    params: {},
	query: {},
})


export const DoctorRegisterVal = Joi.object({

    body:{
        username:Joi.string().required(),
        email:Joi.string().required(),
        password:Joi.string().required(),
        phone:Joi.number().required(),
    },
    params: {},
	query: {},
    file: Joi.object(),
    
})