import { Router } from "express";
import { userController } from "../controllers/user";

const router = Router();

router.post("/login", userController.loginValidation, userController.login)

router.post("/", userController.validationUser, userController.createUser);

router.delete("/:userId", userController.deleteUser)

router.patch("/avatar", userController.editdUserAvatar);

router.patch("/profile", userController.editValidationUser, userController.editUser);

router.patch("/password", userController.validationPass, userController.newPassword);

router.get("/profile/:userId", userController.getUserValidarion, userController.getUser);

router.get("/check/:temp", userController.checkTempValidarion, userController.checkTempLink);

router.post("/check/code", userController.otpValidarion, userController.verifyOtp);

router.post("/resend", userController.validationResend, userController.forgetPass);

router.post("/resendEmail/:userId", userController.resendEmailValidarion, userController.resendEmail);

router.patch("/redefine/:userId", userController.validationRedefine, userController.redefinePass)
export default router;