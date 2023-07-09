const express = require("express");
const Route = express.Router();
const UploadMulter = require("../middlewares/multer");

const {
  CreatePostController,
  FindPostsController,
  FindPostByIdController,
  UpdatePostController,
  RemovePostController,
} = require("../controllers/postController");

Route.post(
  "/product/create",
  UploadMulter.single("image"),
  CreatePostController
);
Route.get("/post/:id", FindPostByIdController);
Route.get("/posts", FindPostsController);
Route.put("/post/update/:id", UpdatePostController);
Route.delete("/post/remove/:id", RemovePostController);

module.exports = Route;
