import { Schema, model } from "mongoose";

export enum FloorType {
    OFFICE = 1,
    MEETING_ROOM = 2,
    WAREHAUSE = 3,
    SHOP = 4
}

export interface FloorI {
    type: FloorType,
};

const floorSchema = new Schema<FloorI>({
    type: {
        type: Number,
        required: true
    }
});

export const Floor = model<FloorI>(
    "Floor",
    floorSchema
);