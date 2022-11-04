import { Building } from "../schema/building.schema";
import { Request, Response } from "express";
import { isValidObjectId, Schema } from "mongoose";

export const createBuilding = async (req: Request, res: Response) => {
    const newB = new Building(req.body);
    newB.save();

    return res.status(200)
        .json({
            statusCode: 200,
            message: "Create building success!",
            data: {
                building: newB
            }
        })
        .end();
}

export const fetchBuilding = async (req: Request, res: Response) => {
    if(!isValidObjectId(req.params.id)) {
        return res.status(400)
            .json({
                statusCode: 400,
                message: "Invalid building id!"
            })
            .end();
    };

    const building = await Building.findById(req.params.id);
    if(!building) return res.status(404).json({
        message: "Building not found!",
        statusCode: 404
    });

    return res.status(200)
        .json({
            statusCode: 200,
            message: "Fetch building success!",
            data: {
                building: building
            }
        })
        .end();
};

export const fetchBuildings = async (req: Request, res: Response) => {
    const buildings = await Building.find({}, { lat: 1, long: 1 });

    return res.status(200)
        .json({
            statusCode: 200,
            message: "Fetch buildings success!",
            data: {
                buildings: buildings
            }
        })
        .end();
};