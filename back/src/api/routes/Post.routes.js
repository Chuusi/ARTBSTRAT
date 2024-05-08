const { upload } = require("../../middleware/files.middleware");
const { createPost, getPostById, getAllPost, updatePost, deletePost} = require("../controllers/Post.controllers");

const PostRoutes = require("express").Router();

PostRoutes.post("/addPost", upload.single("image"), createPost);
PostRoutes.get("/byid/:id", getPostById);
PostRoutes.get("/allPost", getAllPost);
PostRoutes.patch("/update/:id", upload.single("image"), updatePost);
PostRoutes.delete("/delete/:id", deletePost);

module.exports = PostRoutes;