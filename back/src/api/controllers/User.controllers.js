const randomCode = require("../../utils/randomCode");
const User = require("../models/User.model");


//? --------------------------------- REGISTRO USER ---------------------------------------
const registerUser = async (req, res, next) => {
    
    let catchImg = req.file?.path;

    try {

        await User.syncIndexes();

        let confirmationCode = randomCode();
        
    } catch (error) {
        //Error general
    }
}

