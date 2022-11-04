import Joi from "joi";

export const createFloorValidation = Joi.object({
    type: Joi.string().required().valid("Warehouse", "Shop"),
    building: Joi.string().required().custom((value, helpers) => {
        if(value.match(/^[0-9a-fA-F]{24}$/)) {
            return value;
        }

        throw new Error("Invalid building id");
    }),

    // Validate only if type is Warehouse
    warehouse: Joi.object({
        name: Joi.string().min(2).max(64).required(),
    }).when("type", {
        is: "Warehouse",
        then: Joi.required()
    }),

    // Validate only if type is Shop
    shop: Joi.object({
        name: Joi.string().min(2).max(64).required(),
    }).when("type", {
        is: "Shop",
        then: Joi.required()
    }),
});