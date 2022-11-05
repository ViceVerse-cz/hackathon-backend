import { Product } from "../schema/product.schema";
import { Variant } from "../schema/variant.schema";
import { Request, Response } from "express";
import { Schema, Types } from "mongoose";

export const deleteVariant = async (req: Request, res: Response) => {
    if(!req.params.variantId || !req.params.productId) return res.status(400)
        .json({
            message: "Please specify variant and product id!",
            statusCode: 400
        })
        .end();

    await Variant.findByIdAndDelete(req.params.variantId);

    const product = await Product.findById(req.params.productId);
    if(!product) return res.status(404)
        .json({
            message: "Product not found!",
            statusCode: 404
        })
        .end();

    product.variants = product.variants.filter(
        (variant: Schema.Types.ObjectId) => variant.toString() !== req.params.variantId
    );
    await product.save();

    return res.status(200)  
        .json({
            message: "Variant deleted!",
            statusCode: 200
        })
        .end();
};

export const changeVariantCount = async (req: Request, res: Response) => {
    const found = await Variant.findById(req.body.variantId);
    if(!found) {
        return res.status(404).json({
            statusCode: 404,
            message: "Variant not found!"
        });
    };

    found.count = req.body.count;
    found.save();

    return res.status(200)
        .json({
            statusCode: 200,
            message: "Change variant count success!",
            data: {
                variant: found
            }
        })
        .end();
};

export const fetchProduct = async (req: Request, res: Response) => {
    if(!req.params.id) return res.status(400).json({
        statusCode: 400,
        message: "Invalid product id!"
    });

    const { id } = req.params;

    const found = await Product.findById(id);
    if(!found) return res.status(404).json({
        statusCode: 404,
        message: "Product not found!"
    });

    if(found.variants.length > 0) {
        await found.populate("variants");
    }

    return res.status(200).json({
        statusCode: 200,
        message: "Fetch product success!",
        data: {
            product: found
        }
    }).end();
};

export const createProduct = async (req: Request, res: Response) => {
    let finalVariants: Schema.Types.ObjectId[] = [];

    if(req.body.variants) {
        for (let index = 0; index < req.body.variants.length; index++) {
            const element = req.body.variants[index];

            const newV = new Variant({
                name: element.name,
                price: element.price,
                count: 0
            });

            // @ts-ignore
            finalVariants.push(newV._id);

            await newV.save();
        }
    };

    const newP = new Product({
        name: req.body.name,
        description: req.body.description,
        variants: finalVariants
    });
    await newP.save();

    return res.status(200)
        .json({
            statusCode: 200,
            message: "Create product success!",
            data: {
                product: newP
            }
        })
        .end();
};

export const addVariant = async (req: Request, res: Response) => {
    const found = await Product.findById(req.body.product);
    if(!found) return res.status(404).json({
        statusCode: 404,
        message: "Product not found!"
    });

    const newV = new Variant(req.body);
    newV.save();

    found.variants.push(
        // @ts-ignore
        new Types.ObjectId(newV._id.toString())
    );
    found.save();

    return res.status(200)
        .json({
            statusCode: 200,
            message: "Add variant success!",
            data: {
                product: found
            }
        })
        .end();
};

export const searchProducts = async (req: Request, res: Response) => {
    if(!req.params.query) {
        return res.status(400).json({
            statusCode: 400,
            message: "Invalid query!"
        });
    };

    const found = await Product.find({
        $or: [
            {
                name: { 
                    $regex: req.params.query, 
                    $options: "i" 
                },
            },
            {
                description: { 
                    $regex: req.params.query, 
                    $options: "i" 
                },
            }
        ]
    }).populate("variants");

    return res.status(200)
        .json({
            statusCode: 200,
            message: "Search products success!",
            data: {
                products: found
            }
        })
        .end();
}