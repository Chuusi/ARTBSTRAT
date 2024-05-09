const { upload } = require("../../middleware/files.middleware");
const { createPost, getPostById, getAllPost, updatePost, deletePost} = require("../controllers/Post.controllers");

const PostRoutes = require("express").Router();

PostRoutes.post("/addPost", upload.single("image"), createPost);
PostRoutes.get("/byid", getPostById);
PostRoutes.get("/allPost", getAllPost);
PostRoutes.patch("/update", upload.single("image"), updatePost);
PostRoutes.delete("/delete", deletePost);

module.exports = PostRoutes;