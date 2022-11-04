import { model, Schema } from "mongoose";

export interface ShopI {}

const shopSchema = new Schema<ShopI>({
});

export const Shop = model<ShopI>(
    "Shop",
    shopSchema
);