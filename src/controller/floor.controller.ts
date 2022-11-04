import { createFloorService, fetchFloor } from "../service/floor.service";
import { createFloorValidation } from "../validation/floor.validation";
import validation from '../middleware/validation.middleware'; 
import { Router } from "express";

const router = Router();

router.post("/create", async (req, res) => {
    if(validation(req, res, createFloorValidation)) {
        return createFloorService(req, res);
    };
});

router.get('/fetch/:id', async (req, res) => {
    return fetchFloor(req, res);
});

export default router;