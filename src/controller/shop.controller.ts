import { addProduct, fetchShop } from "../service/shop.service";
import { Router } from "express";

const router = Router();

router.get("/fetch", (req, res) => {
    return fetchShop(req, res);
});

router.post('/addProduct', (req, res) => {
    return addProduct(req, res);
});

export default router;