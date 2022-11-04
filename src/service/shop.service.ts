import { Request, Response } from "express";

export const fetchShop = (req: Request, res: Response) => {
    return res.status(200)
        .json({
            statusCode: 200,
            message: "Fetch shop success!"
        })
        .end();
};

export const addProduct = (req: Request, res: Response) => {
    return res.status(200)
        .json({
            statusCode: 200,
            message: "Add product success!"
        })
        .end();
};