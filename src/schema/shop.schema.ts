import { model, Schema } from "mongoose";

export interface ShopI {}

const shopSchema = new Schema<ShopI>({
    name: {
        type: String,
        min: 2,
        max: 64,
        default: "New Shop"
    }
});

export const Shop = model<ShopI>(
    "Shop",
    shopSchema
);