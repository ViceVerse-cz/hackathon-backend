import { Request, Response } from "express";
import { Schema } from "joi";

const returnInvalid = (res: Response, message: String) => {
    return res.status(400).json({
        message: message,
        statusCode: 400
    });
}

export default (
    req: Request, 
    res: Response, 
    schema: Schema
) => {
    if(!req.body) returnInvalid(
        res, 
        "Please specify request body!"
    );

    const validation = schema.validate(req.body);

    if(validation.error) returnInvalid(
        res, 
        validation.error.message
    );
}