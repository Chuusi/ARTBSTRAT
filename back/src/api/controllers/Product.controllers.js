const { deleteImgCloudinary } = require("../../middleware/files.middleware");
const User = require("../models/User.model");


//?----------------------------------- ADD PRODUCT ---------------------------------------
const addProduct = async (req, res)