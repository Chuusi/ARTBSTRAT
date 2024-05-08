const User = require("../api/models/User.model");
const {verifyToken} = require("../utils/token");
const dotenv = require("dotenv");
dotenv.config();

const isAuth = async(req,res,next) => {

    const token = req.headers.authorization?.replace("Bearer ", "");

    if(!token){
        return next(new Error("No autorizado, no hay token"));
    };

    try {
        const decoded = verifyToken(token, process.env.JWT_SECRET);

        req.user = await User.findById(decoded.id);
        next();
    } catch (error) {
        return next(error);
    }

};

const isAuthAdmin = async(req,res,next) => {
    const token = req.headers.authorization?.replace("Bearer ", "");
    if (!token) {
        return next(new Error("No autorizado, no hay token"));
    }

    try {
        const decoded = verifyToken(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id);
        
        if(req.user.role !== "admin"){
            return next(new Error("No autorizado, no eres admin"));
        }
        next();
    } catch (error) {
        return next(error);
    }
};

module.exports = {
    isAuth,
    isAuthAdmin,
}