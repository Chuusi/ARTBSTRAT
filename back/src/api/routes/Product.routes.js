const { upload } = require("../../middleware/files.middleware");
const { addProduct, getProductById, getAllProducts, getProductByName, updateProduct, deleteProduct} = require("../controllers/Product.controllers");

const ProductRoutes = require("express").Router();

ProductRoutes.post("/addProduct", upload.single("image"), addProduct);
ProductRoutes.get("/byid/:id", getProductById);
ProductRoutes.get("/byName/:name", getProductByName);
ProductRoutes.get("/allProducts", getAllProducts);
ProductRoutes.patch("/update/:id", upload.single("image"), updateProduct);
ProductRoutes.delete("/delete/:id",deleteProduct);

module.exports = ProductRoutes;