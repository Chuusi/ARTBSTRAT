const mongoose = require("mongoose");


const PostSchema = new mongoose.Schema(
    {
        title: {type: String},

        image: {type: String, required: true},

        likes: {type: Number,  default: 0},

        comments :[{type: mongoose.Schema.Types.ObjectId, ref: "Comment"}],

        favUsers: [{type: mongoose.Schema.Types.ObjectId, ref: "Comment"}],

    },
    {
        timestamps : true,
    }
);


const Post = mongoose.model("Post", PostSchema);


module.exports = Post
