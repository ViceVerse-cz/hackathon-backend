import { model, Schema } from "mongoose";

export interface WareHouseI {}

const warehouseSchema = new Schema<WareHouseI>({
    name: {
        type: String,
        min: 2,
        max: 64,
        default: "New Warehouse"
    }
});

export const Warehouse = model<WareHouseI>(
    "Warehouse",
    warehouseSchema
);