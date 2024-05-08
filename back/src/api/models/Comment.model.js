const mongoose = require("mongoose");


const CommentSchema = new mongoose.Schema(
    {
        owner: {type: mongoose.Schema.Types.ObjectId, ref: "User"},

        content: {type: String, trim: true, maxLength:140, minLength: 1},

        likes: {type: Numbe, default: 0},

        status: {type: Boolean, default:true}
    },
    {
        timestamps : true,
    }
);


const Comment = mongoose.model("Comment", CommentSchema);


module.exports = Comment;