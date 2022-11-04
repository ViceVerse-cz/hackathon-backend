import { Product } from "../schema/product.schema";
import { Shop } from "../schema/shop.schema";
import { Request, Response } from "express";

export const fetchShop = async (req: Request, res: Response) => {
    if(!req.params.id) {
        return res.status(400).json({
            message: "Please specify shop id",
            statusCode: 400
        });
    };

    const { id } = req.params;
    const found = await Shop.findById(id);
    if(!found) {
        return res.status(404).json({
            message: "Shop not found",
            statusCode: 404
        });
    };

    await found.populate("products.product");

    return res.status(200)
        .json({
            statusCode: 200,
            message: "Fetch shop success!",
            data: {
                shop: found
            }
        })
        .end();
};

export const addProduct = async (req: Request, res: Response) => {
    const found = await Shop.findById(req.body.shopId);
    if(!found) {
        return res.status(404).json({
            statusCode: 404,
            message: "Shop not found!"
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