const {
    registerUser,
    resendCheckCode,
} = require("../controllers/User.controllers");
const {upload} = require("../../middleware/files.middleware")
const express = require("express");
const UserRoutes = express.Router();

UserRoutes.post("/registerUser", upload.single("image"), registerUser);

UserRoutes.patch("/resendCheckCode", resendCheckCode);

module.exports = UserRoutes;