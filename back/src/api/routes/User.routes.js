const {
    registerUser,
    resendCheckCode,
    checkUser,
    login,
    changePassword,
    forgottenPassword,
    changeForgottenPassword,
} = require("../controllers/User.controllers");
const {upload} = require("../../middleware/files.middleware")
const express = require("express");
const { isAuth, isAuthAdmin } = require("../../middleware/auth.middleware");
const UserRoutes = express.Router();

UserRoutes.post("/registerUser", upload.single("image"), registerUser);
UserRoutes.post("/login", login);
UserRoutes.post("/forgottenPassword", forgottenPassword);

UserRoutes.patch("/resendCheckCode", resendCheckCode);
UserRoutes.patch("/checkUser", checkUser);
UserRoutes.patch("/changePassword", [isAuth], changePassword);
UserRoutes.patch("/changeForgottenPassword/:token", changeForgottenPassword)

module.exports = UserRoutes;
