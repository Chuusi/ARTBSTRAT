const { upload } = require("../../middleware/files.middleware");
const { addProduct, getProductById, getAllProducts, getProductByName, updateProduct, deleteProduct} = require("../controllers/Product.controllers");
const { isAuthAdmin } = require("../../middleware/auth.middleware");

const ProductRoutes = require("express").Router();

ProductRoutes.post("/addProduct", [isAuthAdmin], upload.single("image"), addProduct);
ProductRoutes.get("/byid/:id", getProductById);
ProductRoutes.get("/byName/:name", getProductByName);
ProductRoutes.get("/allProducts", getAllProducts);
ProductRoutes.patch("/update", [isAuthAdmin], upload.single("image"), updateProduct);
ProductRoutes.delete("/delete",[isAuthAdmin], deleteProduct);

module.exports = ProductRoutes;