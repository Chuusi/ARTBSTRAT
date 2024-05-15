const { createComment, updateComment, deleteComment, getCommentById, getAllComment} = require("../controllers/Comment.controllers");
const { isAuth, isAuthAdmin } = require("../../middleware/auth.middleware");


const CommentRoutes = require("express").Router();

CommentRoutes.post("/createComment", [isAuth],  createComment);
CommentRoutes.get("/byid", getCommentById);
CommentRoutes.get("/allComment", getAllComment);
CommentRoutes.patch("/update", [isAuth], updateComment);
CommentRoutes.delete("/delete", [isAuth], deleteComment);


module.exports = CommentRoutes;