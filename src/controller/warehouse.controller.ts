import { addProductValidation } from "../validation/warehouse.validation";
import { addProduct, fetchWarehouse } from "../service/warehouse.service";
import validation from "../middleware/validation.middleware";
import jwtMiddleware from "../middleware/jwt.middleware";
import { Router } from "express";

const router = Router();

router.post('/addProduct', jwtMiddleware, (req, res) => {
    if(validation(req, res, addProductValidation)) {
        return addProduct(req, res);
    }
});

router.get('/fetch/:id', (req, res) => {
    return fetchWarehouse(req, res);
});

export default router;