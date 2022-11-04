import Joi from "joi";

export const createBuildingSchema = Joi.object({
    name: Joi.string().min(2).max(64).required(),
    address: Joi.string().min(2).max(512).required(),
    lat: Joi.number().required(),
    long: Joi.number().required()
});