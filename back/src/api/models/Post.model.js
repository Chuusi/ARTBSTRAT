const mongoose = require("mongoose");


const PostSchema = new mongoose.Schema(
    {
        title: {type: String, required: true, unique: true},

        image: {type: String, required: true},

        likes: {type: Number},

        comments :{type: String, trim: true, maxLength:140, minLength: 1},

    },
    {
        timestamps : true,
    }
);


const Post = mongoose.model("Post", PostSchema);


module.exports = Post
