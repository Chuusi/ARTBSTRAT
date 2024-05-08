const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const generateToken = (id, email) => {
    if(!id || !email){
        throw new Error("Falta el id o el mail");
    }

    return jwt.sign({id,email}, process.env.JWT_SECRET, {expiresIn:"1d"});
}

const verifyToken = (token) => {
    if(!token) {
        throw new Error("No se ha encontrado el token")
    }

    return jwt.verify(token, process.env.JWT_SECRET);
};

module.exports = {
    generateToken,
    verifyToken,
}