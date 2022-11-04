import { changeBuildingStateSchema, createBuildingSchema } from "../validation/building.validation";
import validation from "../middleware/validation.middleware";
import jwtMiddleware from "../middleware/jwt.middleware";
import { Router } from "express";
import { 
    changeBuildingState,
    createBuilding, 
    fetchBuilding, 
    fetchBuildings 
} from "../service/building.service";

const router = Router();


/**
 * @swagger
 * /api/building/create:
 *   post:
 *     tags:
 *       - Building
 *     summary: Create a new building
 *     parameters:
 *       - in: body
 *         name: body
 *         required: true
 *         schema:
 *           $ref: '#../definitions/building.definition'
 *     responses:
 *       200:
 *         description: OK
 *         schema:
 *           $ref: '#../definitions/building.definition'
 *       400:
 *         description: Invalid input
 */
router.post("/create", jwtMiddleware, async (req, res) => {
    if(validation(req, res, createBuildingSchema)) {
        return createBuilding(req, res);
    };
});

router.post("/state", jwtMiddleware, async (req, res) => {
    if(validation(req, res, changeBuildingStateSchema)) {
        return changeBuildingState(req, res);
    };
})

router.get("/fetch/:id", async (req, res) => {
    return fetchBuilding(req, res);
});

router.get("/fetch", async (req, res) => {
    return fetchBuildings(req, res);
});

export default router;