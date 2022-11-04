import { Warehouse, WareHouseI } from "../schema/warehouse.schema";
import { Building } from "../schema/building.schema";
import { Shop, ShopI } from "../schema/shop.schema";
import { Floor } from "../schema/floor.schema";
import { Request, Response } from "express";
import { Document, Types } from "mongoose";

export const createFloorService = async (req: Request, res: Response) => {
    // Find building and check if it exists
    const foundBuilding = await Building.findById(req.body.building);
    if(!foundBuilding) return res.status(404).json({
        statusCode: 404,
        message: "This building does not exist!",
    });

    let newItem: WareHouseI & Document | ShopI & Document;
    if(req.body.type == "Warehouse") {
        newItem = new Warehouse({});
    } else {
        newItem = new Shop({});
    };
    newItem.save();

    const newF = new Floor({
        type: req.body.type,
        object: newItem._id
    });
    newF.save();

    foundBuilding.floors.push(new Types.ObjectId(newF._id));
    foundBuilding.save();

    res.status(200).json({
        message: "Floor created successfully!",
        statusCode: 200,
        data: {
            floor: newF
        }
    });
};