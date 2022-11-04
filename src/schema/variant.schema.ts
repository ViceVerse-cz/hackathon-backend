import { model, Schema } from "mongoose";

export interface VariantI {
    name: String,
    price: Number
};

const variantSchema = new Schema<VariantI>({
    name: {
        type: String,
        required: true,
        min: 2,
        max: 64
    },

    price: {
        type: Number,
        required: true
    }
});

export const variantModel = model<VariantI>(
    "Variant", 
    variantSchema
);