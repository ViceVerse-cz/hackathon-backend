import { Request, Response } from "express";
import { Schema } from "joi";

export default (
    req: Request, 
    res: Response, 
    schema: Schema
): Boolean => {
    const validation = schema.validate(req.body);
    
    if(validation.error != undefined) 
    {
        res.status(400).json({
            message: validation.error.message,
            statusCode: 400
        });
        
        return false;
    }

    return true;
}