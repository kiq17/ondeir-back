import { Router } from "express";
import { placeController } from "../controllers/place";
import { authentication } from "../middlewares/auth";


const router = Router();

router.get("/:placeId", placeController.getOnePlace);

router.get("/user/:userId", placeController.allPlacesByUserValidation, placeController.getAllPlacesByUser);

router.use(authentication);

router.post("/:userId", placeController.placeValidation, placeController.createPlace);

router.get("/", placeController.getPlaceByUserId);

router.post("/review/:star/:placeId", placeController.reviewStars);

router.put("/edit/:placeId", placeController.editValidation, placeController.editPlace);

router.delete("/delete/:placeId", placeController.deletePlace);

export default router;