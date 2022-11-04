import { FloorType } from "./floor.schema";
import { Schema, model } from "mongoose";

export enum BuildingState {
    ACTIVE = 1,
    INACTIVE = 2,
    PAUSED = 3
};

export interface BuildingI {
    name: String,
    state: BuildingState,
    address: String,
    floors: [FloorType],
    lat: Number,
    long: Number
}

const buildingSchema = new Schema<BuildingI>({
    name: {
        type: String,
        required: true,
        min: 2,
        max: 64
    },

    state: {
        type: Number,
        required: true
    },

    address: {
        type: String,
        required: true,
        min: 2,
        max: 512
    },

    floors: {
        type: [Number],
        required: true
    },

    lat: {
        type: Number,
        required: true
    },

    long: {
        type: Number,
        required: true
    }
});

export const BuildingModel = model<BuildingI>(
    "Building",
    buildingSchema
);
