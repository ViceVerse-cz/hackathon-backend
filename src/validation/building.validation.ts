import Joi from "joi";

export const createBuildingSchema = Joi.object({
    name: Joi.string().min(2).max(64).required(),
    address: Joi.string().min(2).max(512).required(),
    lat: Joi.number().required(),
    long: Joi.number().required()
});

export const changeBuildingStateSchema = Joi.object({
    state: Joi.number().required().valid(1, 2, 3),
    building: Joi.string().required().custom((value, _helpers) => {
        if(value.match(/^[0-9a-fA-F]{24}$/)) {
            return value;
        };

        throw new Error("Invalid building id");
    }),
});