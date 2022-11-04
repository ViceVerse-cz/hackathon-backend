import { Warehouse, WareHouseI } from "../schema/warehouse.schema";
import { Shop, ShopI } from "../schema/shop.schema";
import { Floor } from "../schema/floor.schema";
import { Request, Response } from "express";
import { Document } from "mongoose";

export const createFloorService = (req: Request, res: Response) => {
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

    res.status(200).json({
        message: "Floor created successfully!",
        statusCode: 200,
        data: {
            floor: newF
        }
    });
};