import Joi from 'joi';

export const loginSchema = Joi.object({
    userId: Joi.string().pattern(/^[0-9]{9}$/).required(),
    password: Joi.string().min(3).required(),
});

export const userSchema = Joi.object({
    userId: Joi.string().pattern(/^[0-9]{9}$/).required(),
    userName: Joi.string().required(),
    address: Joi.string().required(),
    region: Joi.string().required(),
    email: Joi.string().email().required(),
    phoneNumber: Joi.string().pattern(/^\d{10}$/).required(),
});
