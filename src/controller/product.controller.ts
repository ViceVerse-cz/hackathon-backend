import { addVariantValidation, createProductValidation } from "../validation/product.validation";
import validationMiddleware from "../middleware/validation.middleware";
import { addVariant, createProduct, fetchProduct } from "../service/product.service";
import jwtMiddleware from "../middleware/jwt.middleware";
import { Router } from "express";

const router = Router();

router.post("/create", jwtMiddleware,  async (req, res) => {
    if(validationMiddleware(req, res, createProductValidation)) {
        return createProduct(req, res);
    };
});

router.post('/addVariant', jwtMiddleware, async (req, res) => {
    if(validationMiddleware(req, res, addVariantValidation)) {
        return addVariant(req, res);
    }
});

router.get('/fetch/:id', async (req, res) => {
    return fetchProduct(req, res);
});

export default router;