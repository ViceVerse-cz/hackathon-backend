import Joi from "joi";

export const registerSchema = Joi.object({
    name: Joi.string().min(2).max(64).required(),
    surname: Joi.string().min(2).max(64).required(),
    password: Joi.string().min(8).max(1024).required(),
    email: Joi.string().min(6).max(512).required().email()
});

export const loginSchema = Joi.object({
    email: Joi.string().min(6).max(512).required().email(),
    password: Joi.string().min(8).max(1024).required()
});