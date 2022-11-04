import { Schema, model } from "mongoose";
import { Floor } from "./floor.schema";

export enum BuildingState {
    ACTIVE = 1,
    INACTIVE = 2,
    PAUSED = 3
};

export interface BuildingI {
    name: String,
    state: BuildingState,
    address: String,
    floors: [Schema.Types.ObjectId],
    lat: Number,
    long: Number
}

const buildingSchema = new Schema<BuildingI>({
    name: {
        type: String,
        default: "New Building",
        min: 2,
        max: 64
    },

    state: {
        type: Number,
        default: BuildingState.ACTIVE
    },

    address: {
        type: String,
        required: true,
        min: 2,
        max: 512
    },

    floors: {
        type: [Schema.Types.ObjectId],
        ref: "Floor",
        default: []
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

export const Building = model<BuildingI>(
    "Building",
    buildingSchema
);
