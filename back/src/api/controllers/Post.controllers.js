const Post = require("../models/Post.model");

//?-------------------------------------- CREATE POST -------------------------------------------
const createPost = async (req, res, next) => {
    let catchImage = req.file?.path;

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
};


//?--------------------------------------- GET BY ID --------------------------------------------
const getPostById = async (req, res, next) => {
    try {
        const { id } = req.params;

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

    try {
        await Post.syncIndexes();
        const { id } = req.params;
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
};


//?---------------------------------------- DELETE ----------------------------------------------
const detelePost = async (req, res, next) => {
    try {
        const { id } = req.params;

        await Post.findByIdAndDelete(id);

        if (await Post.findById(id)){
            return res.status(404).json({
                message: "❌ No se ha podido borrar el post ❌",
                error: "ERROR 404: if/else del deletePost"
            })
        }else{
            return res.status(200).json("El post se ha borrado correctament 👍")
        }
    } catch (error) {
        return res.status(500).json({
            message: "❌ No ha podido realizarse el delete del post en la DB ❌",
            error: error,
        })
    }
};


module.exports = {
    createPost,
    getPostById,
    getAllPost,
    updatePost,
    detelePost
}