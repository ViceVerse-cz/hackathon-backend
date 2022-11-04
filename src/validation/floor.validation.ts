import Joi from "joi";

export const createFloorValidation = Joi.object({
    type: Joi.string().required().valid("Warehouse", "Shop"),
    building: Joi.string().required().custom((value, helpers) => {
        if(value.match(/^[0-9a-fA-F]{24}$/)) {
            return value;
        }

        throw new Error("Invalid building id");
    })
});