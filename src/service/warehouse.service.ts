import { Request, Response } from "express";
import { Product } from "../schema/product.schema";
import { Warehouse } from "../schema/warehouse.schema";

export const fetchWarehouse = async (req: Request, res: Response) => {
    if(!req.params.id) {
        return res.status(400).json({
            statusCode: 400,
            message: "Invalid warehouse id!"
        })
        .end();
    }
    const { id } = req.params;

    const found = await Warehouse.findById(id);
    if(!found) return res.status(404).json({
        statusCode: 404,
        message: "Warehouse not found!"
    });

    await found.populate("products.product");

    return res.status(200)
        .json({
            statusCode: 200,
            message: "Fetch warehouse success!",
            data: {
                warehouse: found
            }
        })
        .end();
};

export const addProduct = async (req: Request, res: Response) => {
    const found = await Warehouse.findById(req.body.warehouseId);
    if(!found) {
        return res.status(404).json({
            statusCode: 404,
            message: "Warehouse not found!"
        });
    };
    
    const productFound = await Product.findById(req.body.productId);
    if(!productFound) {
        return res.status(404).json({
            statusCode: 404,
            message: "Product not found!"
        });
    };

    found.products.push({
        product: req.body.productId,
        quantity: req.body.quantity
    });
    await found.save();

    return res.status(200)
        .json({
            statusCode: 200,
            message: "Add product success!"
        })
        .end();
};