import { model, Schema } from "mongoose";

export interface WareHouseI {}

const warehouseSchema = new Schema<WareHouseI>({
});

export const Warehouse = model<WareHouseI>(
    "Warehouse",
    warehouseSchema
);