const Comment = require("../models/Comment.model");
const User = require("../models/User.model");
const Post = require("../models/Post.model")



//?-------------------------------------- CREATE COMMENT -------------------------------------------
const createComment = async (req, res, next) => {
    try {
        const newComment = new Comment(req.body);
        const { id, name } = req.user;
        newComment.owner = id;
        newComment.ownerName = name;

        const saveComment = await newComment.save();


        //Añadir el comentario a la lista de comentarios del usuario
        try {
            await User.findByIdAndUpdate( id, {$push: {listOfComments : newComment._id}});

        } catch (error) {
            return res.status(404).json({
                message: "❌ No se ha podido actualizar la lista de comentarios del usuario al borrar el comentario ❌",
                error: error,
            })
        };

        if(saveComment){
            return res.status(200).json("El comentario ha sido creado con éxito")
        }else{
            return res.status(404).json({
                message: "❌ Se ha producido un error al crear el comentario ❌",
                error: "ERROR 404: if/else del createComment",
            })
        };

    } catch (error) {
        return res.status(500).json({
            message: "❌ No se ha podido llevar a cabo la creación del nuevo comentarioe en la DB ❌",
            error: error,
        })
    }
};


//?-------------------------------------- UPDATE COMMENT -------------------------------------------
const updateComment = async (req, res, next) => {
    try {
        await Comment.syncIndexes();
        const { id } = req.body;
        const userId = req.user.id;
        const commentById = await Comment.findById(id);

        if(commentById){
            if (userId == commentById.owner){
                const customBody = {
                    _id: commentById._id,
                    content: req.body?.content ? req.body?.content : commentById.content,
                    status: req.body?.status ? req.body?.status : commentById.status
                };
    
                try {
                    await Post.findByIdAndUpdate(id, customBody);
    
                    //Testeo para saber si el post se ha actualizado correctamente
                    const commentByIdUpdated = await Comment.findById(id);
                    const elementUpdate = Object.keys(req.body);
    
                    let test = {};
                    elementUpdate.forEach((item) => {
                        if(req.body[item] == commentByIdUpdated[item]){
                            test[item] = true;
                        }else{
                            test[item] = false;
                        }
                    });
    
                    if(req.file){
                        commentByIdUpdated.image == req.file?.path
                        ? (test = { ...test, file: true})
                        : (test = { ...test, file: false})
                    };
    
                    let acc = 0;
                    if(acc >0){
                        return res.status(404).json({
                            dataTest: test,
                            message: "❌ El test de actualización ha salido negativo. El comentario no se ha actualizado correctamente ❌",
                            update: false,
                            currentComment: commentByIdUpdated
                        })
                    }else{
                        return res.status(200).json({
                            dataTest: test,
                            message: "El comentario se ha actualizado con éxito",
                            update: true,
                            currentComment: commentByIdUpdated
                        })
                    };
    
                } catch (error) {
                    return res.status(404).json({
                        message: "❌ No ha podido realizar el findByIdAndUpdate al actualizar el comentario ❌",
                        error: error,
                    })
                };
            }else{
                return res.status(404).json({
                    message: "No puedes actualizar un comentario del que no eres propietario",
                    error: "ERROR 404: en el if/else del update comment",
                })
            }

        }else{
            return res.status(404).json({
                message: "❌ No existe ningún comentario con la ID proporcionada ❌",
                error: "ERROR 404: if/else updateComment"
            })
        };

    } catch (error) {
        return res.status(500).json({
            message: "❌ No se ha podido llevar a cabo la busqueda por ID del comentario ❌",
            error: error,
        })
    };
};


//?-------------------------------------- DELETE COMMENT -------------------------------------------
const deleteComment = async (req, res, next) => {
    try {
        const { id } = req.body;
        const currentComment = await Comment.findById(id);
        const userID = req.user.id;

        if (currentComment.owner == userID){
            await Comment.findByIdAndDelete(id);
        }else{
            return res.status(404).json({
                message: "❌ No puedes borrar un comentario del que no eres propietario ❌",
                error: "ERROR 404: if/else para comprobar si un usario es propietario de un comentario",
            })
        }
        

        //Si borramos el comentario de la DB, lo borramos tambien de la lista de comentarios del usuario que lo hizo
        try {
            const userId = req.user.id
            await User.findByIdAndUpdate(
                userId,
                { $pull: {listOfComments : id}}
            );

        } catch (error) {
            return res.status(404).json({
                message: "❌ No se ha podido actualizar la lista de comentarios del usuario al borrar el comentario ❌",
                error: error,
            })
        };

        //Si borramos el comentario de la DB, lo borramos tambien de la lista de comentarios del post en el que se encuentra
        try {
            const idPost = req.body;
            await Post.updateMany(
                idPost,
                { $pull: {comments : id}}
            );

        } catch (error) {
            return res.status(404).json({
                message: "❌ No se ha podido actualizar la lista de comentarios del usuario al borrar el comentario ❌",
                error: error,
            })
        };

        //Test para comprobar si se ha borrado
        if(await Comment.findById(id)){
            return res.status(404).json({
                message: "❌ No se ha borrado correctamente el comentario de la DB ❌",
                error: "ERROR 404: if/else de deleteComment para comprobar si se ha borrado el comentario"
            })
        }else{
            return res.status(200).json("El comentario se ha borrado de la DB con éxito")
        }

    } catch (error) {
        return res.status(500).json({
            message: "❌ No se ha podido llevar a cabo el borrado del comentario de la DB ❌",
            error: error,
        })
    };
};


//?---------------------------------------- GET BY ID ----------------------------------------------
const getCommentById = async (req, res, next) => {
    try {
        const { id } = req.body;

        const commentById = await Comment.findById(id);

        if(commentById){
            return res.status(200).json(commentById)
        }else{
            return res.status(404).json({
                message: "❌ No se ha encontrado un comentario con esa ID ❌",
                error: "ERROR 404: if/else del getCommentById, comentario no encontrado"
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: "❌ No se ha podido llevar a cabo la busqueda de comentario en la DB ❌",
            error: error
        })
    }
};



//?----------------------------------- GET ALL COMMENT ----------------------------------------- 
const getAllComment = async (req, res, next) => {
    try {
        const allComment = await Comment.find();

        if (allComment.length > 0) {
            return res.status(200).json(allComment)
        }else{
            return res.status(404).json({
                message: "❌ No se ha encontrado ningún comentario en la DB ❌",
                error: "ERROR 404: if/else del getAllComment"
            });
        };
    } catch (error) {
        return res.status(500).json({
            message: "❌ No se ha podido realizar la busqueda de todos los comentarios ❌",
            error: error,
        });
    };
};



module.exports = {
    createComment,
    updateComment,
    deleteComment,
    getCommentById,
    getAllComment,
}