import { model, Schema } from "mongoose";

export interface ProductI {
    name: String,
    description: String,
    variants: Schema.Types.ObjectId[]
}

const productSchema = new Schema<ProductI>({
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
    },

    variants: {
        default: [],
        type: [Schema.Types.ObjectId],
        ref: "Variant"
    }
});

productSchema.index({'$**': 'text'});

export const Product = model<ProductI>(
    "Product",
    productSchema
);