const { createComment, updateComment, deleteComment, getCommentById} = require("../controllers/Comment.controllers");
const { isAuth, isAuthAdmin } = require("../../middleware/auth.middleware");


const CommentRoutes = require("express").Router();

CommentRoutes.post("/createComment", [isAuth],  createComment);
CommentRoutes.get("/byid/:id", getCommentById);
CommentRoutes.patch("/update/:id", [isAuth], updateComment);
CommentRoutes.delete("/delete/:id", [isAuth], deleteComment);


module.exports = CommentRoutes;