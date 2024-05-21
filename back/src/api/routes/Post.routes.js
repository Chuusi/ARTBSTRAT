const { upload } = require("../../middleware/files.middleware");
const { createPost, getPostById, getAllPost, updatePost, deletePost} = require("../controllers/Post.controllers");
const { isAuthAdmin } = require("../../middleware/auth.middleware")

const PostRoutes = require("express").Router();

PostRoutes.post("/addPost", [isAuthAdmin], upload.single("image"), createPost);
PostRoutes.get("/byid/:id", getPostById);
PostRoutes.get("/allPost", getAllPost);
PostRoutes.patch("/update", [isAuthAdmin], upload.single("image"), updatePost);
PostRoutes.delete("/delete", [isAuthAdmin], deletePost);

module.exports = PostRoutes;