import Joi from "joi";

export const addProductValidation = Joi.object({
    productId: Joi.string().required().custom((value, _helpers) => {
        if(value.match(/^[0-9a-fA-F]{24}$/)) {
            return value;
        }

        throw new Error("Invalid product id");
    }),
    warehouseId: Joi.string().required().custom((value, _helpers) => {
        if(value.match(/^[0-9a-fA-F]{24}$/)) {
            return value;
        }

        throw new Error("Invalid product id");
    }),
    quantity: Joi.number().optional().min(1)
});
