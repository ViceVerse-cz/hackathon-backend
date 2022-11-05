import { Building } from "../schema/building.schema";
import { isValidObjectId } from "mongoose";
import { Request, Response } from "express";

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

export const changeBuildingState = async (req: Request, res: Response) => {
    const found = await Building.findById(req.body.building);
    if(!found) return res.status(404).json({
        statusCode: 404,
        message: "Building not found!"
    });

    found.state = req.body.state;
    found.save();

    return res.status(200)
        .json({
            statusCode: 200,
            message: "Change state success!",
            data: {
                building: found
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

    await building.populate("floors");

    await building.populate("floors.warehouse");
    await building.populate("floors.shop");

    let productCount = 0;
    let productMissing = 0;

    for(let i = 0; i < building.floors.length; i++) {
        const floor = building.floors[i];
        if((<any>floor).warehouse) {
            for(let j = 0; j < (<any>floor).warehouse.products.length; j++) {
                const product = (<any>floor).warehouse.products[j];
                productCount += product.quantity;
                if(product.quantity === 0) productMissing++;
            }
        }
    }

    return res.status(200)
        .json({
            statusCode: 200,
            message: "Fetch building success!",
            data: {
                building: building,
                productCount: productCount,
                productMissing: productMissing
            }
        })
        .end();
};

export const fetchBuildings = async (req: Request, res: Response) => {
    const buildings = await Building.find({}, { 
        lat: 1, 
        long: 1, 
        name: 1, 
        state: 1 
    });

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

export const fetchBuildingsFloor = async (req: Request, res: Response) => {
    const buildings = await Building.find({}, { 
        lat: 1, 
        long: 1, 
        name: 1, 
        state: 1,
        floors: 1
    }).populate("floors");

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