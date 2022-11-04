import { Schema, model } from "mongoose";

export enum FloorType {
    WAREHOUSE = "Warehouse",
    SHOP = "Shop"
};

export interface FloorI {
    type: FloorType,
    shop: Schema.Types.ObjectId,
    warehouse: Schema.Types.ObjectId
};

const floorSchema = new Schema<FloorI>({
    type: {
        type: String,
        required: true
    },

    shop: {
        type: Schema.Types.ObjectId,
        ref: "Shop"
    },

    warehouse: {
        type: Schema.Types.ObjectId,
        ref: "Warehouse"
    }
});

export const Floor = model<FloorI>(
    "Floor",
    floorSchema
);