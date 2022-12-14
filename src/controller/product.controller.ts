import { addVariant, changeVariantCount, createProduct, deleteVariant, fetchProduct, searchProducts } from "../service/product.service";
import validationMiddleware from "../middleware/validation.middleware";
import jwtMiddleware from "../middleware/jwt.middleware";
import { Router } from "express";
import { 
    addVariantValidation, 
    createProductValidation, 
    changeVariantCountValidation 
} from "../validation/product.validation";

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

router.delete('/deleteVariant', jwtMiddleware, async (req, res) => {
    return deleteVariant(req, res);
});

router.post('/changeVariantCount', jwtMiddleware, async (req, res) => {
    if(validationMiddleware(req, res, changeVariantCountValidation)) {
        return changeVariantCount(req, res);
    }
});

router.get('/fetch/:id', async (req, res) => {
    return fetchProduct(req, res);
});

router.get('/search/:query', async (req, res) => {
    return searchProducts(req, res);
})

export default router;