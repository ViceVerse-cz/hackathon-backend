import { Request, Response } from "express";
import { Schema } from "joi";

const returnInvalid = (res: Response, message: String): Boolean => {
    res.status(400).json({
        message: message,
        statusCode: 400
    });

    return true;
}

export default (
    req: Request, 
    res: Response, 
    schema: Schema
): Boolean => {
    if(!req.body) return returnInvalid(
        res, 
        "Please specify request body!"
    );

    const validation = schema.validate(req.body);

    console.log(validation.error);
    if(validation.error) return returnInvalid(
        res, 
        validation.error.message
    );

    return true;
}