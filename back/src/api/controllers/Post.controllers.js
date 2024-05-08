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