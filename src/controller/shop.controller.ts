import { addProductValidation } from "../validation/shop.validation";
import { addProduct, fetchShop } from "../service/shop.service";
import validation from '../middleware/validation.middleware';
import { Router } from "express";

const router = Router();

router.get("/fetch/:id", (req, res) => {
    return fetchShop(req, res);
});

router.post('/addProduct', (req, res) => {
    if(validation(req, res, addProductValidation)) {
        return addProduct(req, res);
    }
});

export default router;