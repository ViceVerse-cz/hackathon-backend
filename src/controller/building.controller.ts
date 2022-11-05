import { changeBuildingStateSchema, createBuildingSchema } from "../validation/building.validation";
import validation from "../middleware/validation.middleware";
import jwtMiddleware from "../middleware/jwt.middleware";
import { Router } from "express";
import { 
    changeBuildingState,
    createBuilding, 
    fetchBuilding, 
    fetchBuildings, 
    fetchBuildingsFloor
} from "../service/building.service";

const router = Router();

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

router.get("/fetch-floor", async (req, res) => {
    return fetchBuildingsFloor(req, res);
})

export default router;