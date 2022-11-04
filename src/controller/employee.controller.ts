import { registerSchema, loginSchema } from '../validation/employee.validation';
import { loginUser, registerUser } from '../service/employee.service';
import validation from '../middleware/validation.middleware'; 
import jwtMiddleware from '../middleware/jwt.middleware';
import { Router, Request, Response } from 'express';

const router = Router();

router.post('/register', async(req: Request, res: Response) => {
    if(validation(req, res, registerSchema)) {
        return registerUser(req, res);
    };
});

router.post('/login', async(req: Request, res: Response) => {
    if(validation(req, res, loginSchema)) {
        return loginUser(req, res);
    }
});

router.get('/@me', jwtMiddleware, async(req: Request, res: Response) => {
    let empl = req.employee;
    empl['avatar'] = req.employee['avatar'];

    return res.status(200).json({
        message: "Hello world!",
        statusCode: 200,
        data: {
            employee: empl
        }
    });
});

export default router;