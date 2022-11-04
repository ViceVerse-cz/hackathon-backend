import { model, Schema } from "mongoose";

export interface ProductI {
    name: {
        type: String,
        required: true,
        min: 2,
        max: 64
    },

    description: {
        type: String,
        required: true,
        min: 2,
        max: 512
    }
}

const productSchema = new Schema<ProductI>({
});

export const Product = model<ProductI>(
    "Product",
    productSchema
);