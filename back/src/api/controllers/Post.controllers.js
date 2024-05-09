const { deleteImgCloudinary } = require("../../middleware/files.middleware");
const Post = require("../models/Post.model");
const User = require("../models/User.model");


//?-------------------------------------- CREATE POST -------------------------------------------
const createPost = async (req, res, next) => {
    let catchImage = req.file?.path;
    const userRole = req.user.role;

    if (userRole == "admin"){
        try {
            await Post.syncIndexes();
    
            const newPost = new Post(req.body);
            newPost.image = catchImage;
    
            const savePost = await newPost.save();
    
            if(savePost){
                return res.status(200).json(savePost)
            }else{
                return res.status(404).json({
                    message: "❌ No se ha posido crear el nuevo post ❌",
                    error: "ERROR 404: if/else del createPost, al intentar guardar el nuevo post"
                })
            };
    
        } catch (error) {
            return res.status(500).json({
                message: "❌ No se ha podido crear un nuevo Post en la DB ❌",
                error: error,
            })
        };
    }else{
        return res.status(404).json({
            message: "❌ Solo un administrador puede crear nuevos posts en esta página ❌",
            error: "USUARIO NO AUTORIZADO"
        })
    }
    
};


//?--------------------------------------- GET BY ID --------------------------------------------
const getPostById = async (req, res, next) => {
    try {
        const { id } = req.body;

        const postById = await Post.findById(id);

        if(postById){
            return res.status(200).json(postById)
        }else{
            return res.status(404).json({
                message: "❌ No se ha encontrado ningún post con esa ID ❌",
                error: "ERROR 404: if/else en getPostById"
            })
        };

    } catch (error) {
        return res.status(500).json({
            message: "❌ No se ha podido realizar la busqueda de un post por ID ❌",
            error: error,
        })
    }
};


//?------------------------------------- GET ALL POST -------------------------------------------
const getAllPost = async (req, res, next) => {
    try {
        const allPost =await Post.find();

        if(allPost.length > 0){
            return res.status(200).json(allPost)
        }else{
            return res.status(404).json({
                message: "❌ No se han podido recuperar todos los post ❌",
                error: "ERROR 404: if/else del getAllPost"
            })
        };

    } catch (error) {
        return res.status(500).json({
            message: "❌ No se ha podido llevar a cabo la extraccion de todos los post de la DB ❌",
            error: error,
        })
    }
};


//?---------------------------------------- UPDATE ---------------------------------------------- 
const updatePost = async (req, res, next) => {
    let catchImg = req.file?.path;
    const userRole = req.user.role;

    if (userRole == "admin"){
        try {
            await Post.syncIndexes();
            const { id } = req.body;
            const postById = await Post.findById(id);
    
            if(postById){
                const oldImg = postById.image;
    
                const customBody = {
                    _id: postById._id,
                    title: req.body?.title ? req.body?.title : postById.title,
                    image: req.file?.path ? catchImg : oldImg,
                };
    
                try {
                    await Post.findByIdAndUpdate(id, customBody);
                    if(req.file?.path){
                        deleteImgCloudinary(oldImg)
                    };
    
                    //Testeo para saber si el post se ha actualizado correctamente
                    const postByIdUpdated = await Post.findById(id);
                    const elementUpdate = Object.keys(req.body);
    
                    let test = {};
                    elementUpdate.forEach((item) => {
                        if(req.body[item] == postByIdUpdated[item]){
                            test[item] = true;
                        }else{
                            test[item] = false;
                        }
                    });
    
                    if(req.file){
                        postByIdUpdated.image == req.file?.path
                        ? (test = { ...test, file: true})
                        : (test = { ...test, file: false})
                    };
    
                    let acc = 0;
                    if(acc >0){
                        return res.status(404).json({
                            dataTest: test,
                            message: "❌ El test de actualización ha salido negativo. El post no se ha actualizado correctamente ❌",
                            update: false,
                            currentProduct: postByIdUpdated
                        })
                    }else{
                        return res.status(200).json({
                            dataTest: test,
                            message: "El post se ha actualizado con éxito",
                            update: true,
                            currentProduct: postByIdUpdated
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
                    message: "❌ No existe ningún post con la ID proporcionada ❌",
                    error: "ERROR 404: if/else updatePost"
                })
            };
    
        } catch (error) {
            return res.status(500).json({
                message: "❌ No se ha podido llevar a cabo la busqueda por ID del post ❌",
                error: error,
            })
        };
    }else{
        return res.status(404).json({
            message: "❌ Solo un administrador puede modificar posts en esta página ❌",
            error: "USUARIO NO AUTORIZADO"
        })
    }

    
};


//?---------------------------------------- DELETE ----------------------------------------------
const deletePost = async (req, res, next) => {
    const userRole = req.user.role;

    if (userRole == "admin"){
        try {
            const { id } = req.body;
            const postToDelete = await Post.findById(id);
            const imageToDelete = postToDelete.image;
    
            //Si borramos el post de la DB, lo borramos tambien de la lista de FAVS de cada usuario que lo tenga agregado
            try {
                postToDelete.favUsers.forEach(async (userId) => {
                    await User.findByIdAndUpdate(userId, { $pull: {favPosts : id}})
                });
    
            } catch (error) {
                return res.status(404).json({
                    message: "❌ No se ha podido actualizar la lista de post Favs de los usuarios al borrar el post ❌",
                    error: error,
                })
            };
    
            try {
                await Post.findByIdAndDelete(id);
                deleteImgCloudinary(imageToDelete);
    
                if(await Post.findById(id)){
                    return res.status(404).json({
                        message: "❌ No se ha borrado correctamente el post de la DB ❌",
                        error: "ERROR 404: if/else de deletePost para comprobar si se ha borrado el post"
                    })
                }else{
                    return res.status(200).json("El post se ha borrado de la DB con éxito")
                }
    
            } catch (error) {
                return res.status(500).json({
                    message: "❌ No se ha podido ejecutar el findByIdAndDelete en el deletePost ❌",
                    error: error
                })
            }
    
        } catch (error) {
            return res.status(500).json({
                message: "❌ No se ha podido llevar a cabo el borrado del post de la DB ❌",
                error: error,
            })
        };
    }else{
        return res.status(404).json({
            message: "❌ Solo un administrador puede borrar posts en esta página ❌",
            error: "USUARIO NO AUTORIZADO"
        })
    }
    
};


module.exports = {
    createPost,
    getPostById,
    getAllPost,
    updatePost,
    deletePost
}