import { registerSchema, loginSchema } from '../validation/employee.validation';
import validation from '../middleware/validation.middleware'; 
import { Employee } from '../schema/employee.schema';
import { Router, Request, Response } from 'express';
import { hash, compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';

const router = Router();

router.post('/register', async(req: Request, res: Response) => {
    validation(req, res, registerSchema);

    req.body.password = await hash(req.body.password, 10);

    const newE = new Employee(req.body);
    await newE.save();

    const token = sign({ _id: newE._id }, process.env.JWT_SECRET || "", {
        algorithm: "HS256",
    });

    return res.status(200)
        .json({
            message: "Register success!",
            data: {
                token: token,
                employee: newE
            },
            statusCode: 200
        })
        .end();
});

router.post('/login', async(req: Request, res: Response) => {
    validation(req, res, loginSchema);

    const employee = await Employee.findOne({ email: req.body.email });
    if(!employee) return res.status(404).json({
        message: "Employee not found!",
        statusCode: 404
    });

    const verified = await compare(req.body.password, employee.password.toString());
    if(!verified) return res.status(401).json({
        message: "Invalid password!",
        statusCode: 401
    });

    const token = sign({ _id: employee._id }, process.env.JWT_SECRET || "", {
        algorithm: "HS256",
    });

    return res.status(200)
    .json({
        message: "Login success!",
        data: {
            token: token,
            employee: employee
        },
        statusCode: 200
    })
    .end();
});

export default router;