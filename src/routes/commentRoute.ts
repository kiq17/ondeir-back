import { Router } from "express";
import { commentController } from "../controllers/comment";
import { authentication } from "../middlewares/auth";

const router = Router();

router.get("/:placeId", commentController.getComments);

router.use(authentication);

router.post("/:placeId", commentController.validationComment ,commentController.createComment);

router.post("/toggle/:commentId", commentController.toggleValidation, commentController.toggleLike)

export default router;