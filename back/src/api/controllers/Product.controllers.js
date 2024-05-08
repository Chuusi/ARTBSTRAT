const { deleteImgCloudinary } = require("../../middleware/files.middleware");
const Product = require("../models/Product.model");
const User = require("../models/User.model");


//?-------------------------------------- ADD PRODUCT ------------------------------------------
const addProduct = async (req, res, next) => {
    let catchImg = req.file?.path;

    try {
        await Product.syncIndexes();

        const newProduct = new Product(req.body);
        newProduct.image = catchImg;

        const saveProduct = await newProduct.save();

        if(saveProduct){
            return res.status(200).json(saveProduct)
        }else{
            return res.status(500).json({
                message : "❌ No se ha podido guardar el nuevo producto en la DB ❌",
                error: error,
            })
        }

    } catch (error) {
        
    }
};


//?---------------------------------- GET PRODUCT BY ID ----------------------------------------
const getProductById = async (req, res, next) => {
    try {
        const { id } = req.params;

        const productById = await Product.findById(id);

        if(productById){
            return res.status(200).json(productById)
        }else{
            return res.status(404).json({
                message: "❌ No se ha encontrado un producto con esa ID ❌",
                error: "ERROR 404: if/else del getProductById"
            });
        };

    } catch (error) {
        return res.status(500).json({
            message: "❌ No se ha podido realizar la busqueda de producto por ID ❌",
            error: error,
        });
    };
};


//?----------------------------------- GET ALL PRODUCT ----------------------------------------- 
const getAllProducts = async (req, res, next) => {
    try {
        const allProducts = await Product.find();

        if (allProducts.length > 0) {
            return res.status(200).json(allProducts)
        }else{
            return res.status(404).json({
                message: "❌ No se ha encontrado ningún producto en la DB ❌",
                error: "ERROR 404: if/else del getAllProducts"
            });
        };
    } catch (error) {
        return res.status(500).json({
            message: "❌ No se ha podido realizar la busqueda de todos los productos ❌",
            error: error,
        });
    };
};


//?-------------------------------- GET PRODUCT BY NAME ----------------------------------------
const getProductByName = async (req, res, next) => {
    try {
        const { name } = req.params;
        const productByName = await Product.find({ name });

        if (productByName){
            return res.status(200).json(productByName)
        }else{
            return res.status(404).json({
                message: `❌ No se ha podido encontrar un producto con el nombre ${name} ❌`,
                error: "ERROR 404: if/else del getProductByName",
            });
        };

    } catch (error) {
        return res.status(500).json({
            message: "❌ No se ha podido realizar la busqueda de un producto por su nombre ❌",
            error: error,
        });
    };
};


//?----------------------------------- UPDATE PRODUCT ------------------------------------------
const updateProduct = async (req, res, next) => {
    let catchImg = req.file?.path;

    try {
        await Product.syncIndexes();
        const { id } = req.params;
        const productById = await Product.findById(id);

        if(productById){
            const oldImg = productById.image;

            const customBody = {
                _id: productById._id,
                name: req.body?.name ? req.body?.name : productById.name,
                image: req.file?.path ? catchImg : oldImg,
                description: req.body?.description ? req.body?.description : productById.description,
                dimensions: req.body?.dimensions ? req.body?.dimensions : productById.dimensions,
                composition: req.body?.composition ? req.body?.composition : productById.composition,
                stock: req.body?.stock ? req.body?.stock : productById.stock,
                price: req.body?.price ? req.body?.price : productById.price,
                offer: req.body?.offer ? req.body?.offer : productById.offer,
                offerPrice: req.body?.offerPrice ? req.body?.offerPrice : productById.offerPrice,
            };

            try {
                await Product.findByIdAndUpdate(id, customBody);
                if(req.file?.path){
                    deleteImgCloudinary(oldImg)
                };

                //Testeo para saber si el producto se ha actualizado correctamente
                const productByIdUpdated = await Product.findById(id);
                const elementUpdate = Object.keys(req.body);

                let test = {};
                elementUpdate.forEach((item) => {
                    if(req.body[item] == productByIdUpdated[item]){
                        test[item] = true;
                    }else{
                        test[item] = false;
                    }
                });

                if(req.file){
                    productByIdUpdated.image == req.file?.path
                    ? (test = { ...test, file: true})
                    : (test = { ...test, file: false})
                };

                let acc = 0;
                if(acc >0){
                    return res.status(404).json({
                        dataTest: test,
                        message: "❌ El test de actualización ha salido negativo. El producto no se ha actualizado correctamente ❌",
                        update: false,
                        currentProduct: productByIdUpdated
                    })
                }else{
                    return res.status(200).json({
                        dataTest: test,
                        message: "El producto se ha actualizado con éxito",
                        update: true,
                        currentProduct: productByIdUpdated
                    })
                };


            } catch (error) {
                return res.status(404).json({
                    message: "❌ No ha podido realizar el findByIdAndUpdate ❌",
                    error: error,
                })
            };

        }else{
            return res.status(404).json({
                message: "❌ No existe ningún producto con la ID proporcionada ❌",
                error: "ERROR 404: if/else updateProduct"
            })
        };

    } catch (error) {
        return res.status(500).json({
            message: "❌ No se ha podido llevar a cabo la busqueda por ID del producto ❌",
            error: error,
        })
    };
};


//?----------------------------------- DELETE PRODUCT ------------------------------------------ 
const deleteProduct = async (req, res, next) => {
    try {
        const { id } = req.params;
        const productToDelete = await Product.findById(id);
        const imageToDelete = productToDelete.image;

        //Si borramos el producto de la DB, lo borramos tambien de la lista de FAVS de cada usuario que lo tenga agregado
        try {
            const test = await User.updateMany(
                { favUsers : id },
                { $pull: {favUsers : id}}
            );

            console.log(test);

        } catch (error) {
            return res.status(404).json({
                message: "❌ No se ha podido actualizar la lista de productos Favs de los usuarios al borrar el producto ❌",
                error: error,
            })
        };

        try {
            await Product.findByIdAndDelete(id);
            deleteImgCloudinary(imageToDelete);

            if(await Product.findById(id)){
                return res.status(404).json({
                    message: "❌ No se ha borrado correctamente el producto de la DB ❌",
                    error: "ERROR 404: if/else de deleteProduct para comprobar si se ha borrado el producto"
                })
            }else{
                return res.status(200).json("El producto se ha borrado de la DB con éxito")
            }

        } catch (error) {
            return res.status(500).json({
                message: "❌ No se ha podido ejecutar el findByIdAndDelete ❌",
                error: error
            })
        }

    } catch (error) {
        return res.status(500).json({
            message: "❌ No se ha podido llevar a cabo el borrado del producto de la DB ❌",
            error: error,
        })
    };
};


module.exports = {
    addProduct,
    getProductById,
    getAllProducts,
    getProductByName,
    updateProduct,
    deleteProduct
};