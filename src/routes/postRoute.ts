import { Router } from "express";
import { placeController } from "../controllers/place";


const router = Router();

router.get("/tags", placeController.getTags);

router.get("/all", placeController.allPlacesValidation, placeController.getAllPlaces);

export default router;