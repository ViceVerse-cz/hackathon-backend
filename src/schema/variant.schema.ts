import { model, Schema } from "mongoose";

export interface VariantI {
    name: String,
    price: Number,
    count: Number
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
    },

    count: {
        type: Number,
        default: 0
    }
});

export const Variant = model<VariantI>(
    "Variant", 
    variantSchema
);