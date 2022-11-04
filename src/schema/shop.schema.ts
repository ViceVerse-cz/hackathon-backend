import { model, Schema } from "mongoose";

export interface ShopI {
    name: String,
    products: [{
        product: Schema.Types.ObjectId,
        quantity: Number
    }]
}

const shopSchema = new Schema<ShopI>({
    name: {
        type: String,
        min: 2,
        max: 64,
        default: "New Shop"
    },

    products: [{
        product: {
            type: Schema.Types.ObjectId,
            ref: "Product"
        },
        quantity: {
            type: Number,
            default: 0
        }
    }]
});

export const Shop = model<ShopI>(
    "Shop",
    shopSchema
);