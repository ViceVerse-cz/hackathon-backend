import { model, Schema } from "mongoose";

export interface WareHouseI {
    name: String,
    products: [{
        product: Schema.Types.ObjectId,
        quantity: Number
    }]
}

const warehouseSchema = new Schema<WareHouseI>({
    name: {
        type: String,
        min: 2,
        max: 64,
        default: "New Warehouse"
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

export const Warehouse = model<WareHouseI>(
    "Warehouse",
    warehouseSchema
);