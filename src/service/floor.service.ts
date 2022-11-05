import { Warehouse, WareHouseI } from "../schema/warehouse.schema";
import { Building } from "../schema/building.schema";
import { Shop, ShopI } from "../schema/shop.schema";
import { Floor } from "../schema/floor.schema";
import { Request, Response } from "express";
import { Document, Types } from "mongoose";

export const fetchFloor = async (req: Request, res: Response) => {
    if(!req.params.id) {
        return res.status(400).json({
            message: "Please specify floor id",
            statusCode: 400
        })
        .end();
    }

    const { id } = req.params;
    const found = await Floor.findById(id);
    if(!found) {
        return res.status(404).json({
            message: "Floor not found",
            statusCode: 404
        })
        .end();
    }

    if(found.type === "Warehouse") {
        await found.populate("warehouse");
        await found.populate("warehouse.products.product");
        await found.populate("warehouse.products.product.variants");
    } else {
        await found.populate("shop");
        await found.populate("shop.products.product");
        await found.populate("shop.products.product.variants");
    }

    let productCount = 0;
    let productMissing = 0;

    if(found.type === "Warehouse") {
        for(let i = 0; i < (found.warehouse as any).products.length; i++) {
            const product = (found.warehouse as any).products[i];
            productCount += product.quantity;
            if(product.quantity === 0) productMissing++;
        }
    } else {
        for(let i = 0; i < (found.shop as any).products.length; i++) {
            const product = (found.shop as any).products[i];
            productCount += product.quantity;
            if(product.quantity === 0) productMissing++;
        }
    };

    return res.status(200)
        .json({
            message: "Fetch floor success!",
            statusCode: 200,
            data: {
                floor: found,
                productCount: productCount,
                productMissing: productMissing
            }
        })
        .end();
};

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