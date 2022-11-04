import { Schema, model } from "mongoose";

export enum FloorType {
    WAREHOUSE = "Warehouse",
    SHOP = "Shop"
};

export interface FloorI {
    type: FloorType,
    object: Schema.Types.ObjectId
};

const floorSchema = new Schema<FloorI>({
    type: {
        type: String,
        required: true
    },

    object: {
        type: Schema.Types.ObjectId,
        required: true,
        refPath: "type"
    }
});

export const Floor = model<FloorI>(
    "Floor",
    floorSchema
);