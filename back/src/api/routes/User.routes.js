const {
    registerUser,
    resendCheckCode,
    checkUser,
    login,
    changePassword,
    forgottenPassword,
    changeForgottenPassword,
    updateUser,
    deleteUser,
    addFavProduct,
    addFavPost,
    addBasket,
    adminUser,
    getUserByEmail,
} = require("../controllers/User.controllers");
const {upload} = require("../../middleware/files.middleware")
const express = require("express");
const { isAuth, isAuthAdmin } = require("../../middleware/auth.middleware");
const UserRoutes = express.Router();

UserRoutes.post("/registerUser", upload.single("image"), registerUser);
UserRoutes.post("/login", login);
UserRoutes.post("/forgottenPassword", forgottenPassword);

UserRoutes.get("/getUserByEmail", getUserByEmail);

UserRoutes.patch("/resendCheckCode", resendCheckCode);
UserRoutes.patch("/checkUser", checkUser);
UserRoutes.patch("/changePassword", [isAuth], changePassword);
UserRoutes.patch("/changeForgottenPassword/:token", changeForgottenPassword);
UserRoutes.patch("/updateUser", [isAuth], updateUser);
UserRoutes.patch("/addFavProduct", [isAuth], addFavProduct);
UserRoutes.patch("/addFavPost", [isAuth], addFavPost);
UserRoutes.patch("/addBasket", [isAuth], addBasket);

UserRoutes.delete("/deleteUser", [isAuth], deleteUser);

UserRoutes.patch("/adminUser", [isAuthAdmin], adminUser);

module.exports = UserRoutes;
