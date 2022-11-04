import { createFloorValidation } from "../validation/floor.validation";
import { createFloorService } from "../service/floor.service";
import validation from '../middleware/validation.middleware'; 
import { Router } from "express";

const router = Router();

router.post("/create", async (req, res) => {
    if(validation(req, res, createFloorValidation)) {
        return createFloorService(req, res);
    };
});

export default router;