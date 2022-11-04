import { Building } from "../schema/building.schema";
import { Request, Response } from "express";

export const createBuilding = async (req: Request, res: Response) => {
    const newB = new Building(req.body);
    newB.save();

    console.log(1);
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
    return res.status(200).send("Jedna budova");
};

export const fetchBuildings = async (req: Request, res: Response) => {
    return res.status(200).send("Vice budov");
};