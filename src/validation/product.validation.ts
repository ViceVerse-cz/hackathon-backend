import Joi from "joi";

export const createProductValidation = Joi.object({
    name: Joi.string().min(2).max(64).required(),
    description: Joi.string().min(2).max(2048).required(),
    variants: Joi.array().items(Joi.object({
        name: Joi.string().min(2).max(64).required(),
        price: Joi.number().required(),
        count: Joi.number().optional().default(0)
    }))
});

export const changeVariantCountValidation = Joi.object({
    variantId: Joi.string().required().custom((value, _helpers) => {
        if(value.match(/^[0-9a-fA-F]{24}$/)) {
            return value;
        }

        throw new Error("Invalid variant id");
    }),
    count: Joi.number().required().min(0)
});

export const addVariantValidation = Joi.object({
    product: Joi.string().required().custom((value, _helpers) => {
        if(value.match(/^[0-9a-fA-F]{24}$/)) {
            return value;
        }

        throw new Error("Invalid product id");
    }),
    name: Joi.string().min(2).max(64).required(),
    price: Joi.number().required()
});