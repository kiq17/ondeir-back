import * as createUser from "./createUser.controller";
import * as login from "./login.controller";
import * as editAvatar from "./editUserAvatar.controller";
import * as getUser from "./getUser.controller";
import * as editUser from "./editUser.controller";
import * as checkTempLink from "./checkTempLink.controller";
import * as verifyOtp from "./verificationOtp.controller";
import * as newPassword from "./newPassword.controller";
import * as deleteUser from "./deleteUser.controller";
import * as forgetPass from "./forgetPass.controller";
import * as redefinePass from "./redefinePass.controller"
import * as resendEmail from "./resendEmail.controller";

export const userController = {
    ...createUser,
    ...login,
    ...editAvatar,
    ...getUser,
    ...editUser,
    ...checkTempLink,
    ...verifyOtp,
    ...newPassword,
    ...deleteUser,
    ...forgetPass,
    ...redefinePass,
    ...resendEmail
};