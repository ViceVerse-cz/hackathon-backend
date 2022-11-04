import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

const NotAuthorized = (res: Response) => {
    return res.status(401).json({
        message: "You are not authorized to access this resources!",
        statusCode: 401
    });
}

const InvalidToken = (res: Response) => {
    return res.status(401).json({
        message: "Invalid token!",
        statusCode: 401
    });
}

export default async (req: Request, res: Response, next: NextFunction) => {
    const token = req.header("authorization");
    if(!token) return NotAuthorized(res);

    try {
        const verified = verify(token, process.env.JWT_SECRET || "");
        req.employee = verified;
        next();
    } catch (error) {
        return InvalidToken(res);
    }
}