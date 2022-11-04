import { NextFunction, Request, Response } from 'express';
import { Employee } from '../schema/employee.schema';
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
    if(!token) {
        return NotAuthorized(res);
    }

    try {
        const verified = verify(token, process.env.JWT_SECRET || "");
        const found = await Employee.findById((verified as any)._id);

        if(!found) {
            return NotAuthorized(res);
        }

        req.employee = found;

        next();
    } catch (error) {
        return InvalidToken(res);
    }
}