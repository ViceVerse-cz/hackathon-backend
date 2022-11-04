import { Warehouse, WareHouseI } from "../schema/warehouse.schema";
import { Building } from "../schema/building.schema";
import { Shop, ShopI } from "../schema/shop.schema";
import { Floor } from "../schema/floor.schema";
import { Request, Response } from "express";
import { Document, Schema, Types } from "mongoose";

export const createFloorService = async (req: Request, res: Response) => {
    // Find building and check if it exists
    const foundBuilding = await Building.findById(req.body.building);
    if(!foundBuilding) return res.status(404).json({
        statusCode: 404,
        message: "This building does not exist!",
    });

    let newItem: WareHouseI & Document | ShopI & Document;
    if(req.body.type == "Warehouse") {
        newItem = new Warehouse({
            name: req.body.warehouse.name
        });
    } else {
        newItem = new Shop({
            name: req.body.shop.name
        });
    };
    newItem.save();

    const newF = new Floor({
        type: req.body.type,
        ...req.body.type == "Warehouse" ? {
            warehouse: newItem._id
        } : {
            shop: newItem._id
        }
    });
    newF.save();

    foundBuilding.floors.push(
        // @ts-ignore
        new Types.ObjectId(newF._id.toString())
    );
    foundBuilding.save();

    res.status(200).json({
        message: "Floor created successfully!",
        statusCode: 200,
        data: {
            floor: newF
        }
    });
};