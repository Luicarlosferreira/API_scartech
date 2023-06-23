const {
  CreatePost,
  FindPostById,
  FindPosts,
  RemovePost,
  UpdatePostById,
} = require("../repositories/post");

const UploadImageStorage = require("../utils/images/imageStorage");
const CreatePostController = async (req, res) => {
  const { title, description } = req.body;

  const valueImage = await UploadImageStorage(req.file.path);
  const imageUrl = valueImage.url;
  try {
    const data = await CreatePost({ title, description, imageUrl });
    return res.status(200).send({ "post created": data });
  } catch (error) {
    return res.status(400).send({ error: error.message });
  }
};

const FindPostsController = async (req, res) => {
  try {
    const data = await FindPosts();
    return res.status(200).send({ posts: data });
  } catch (error) {
    return res.status(400).send({ error: error.message });
  }
};

const FindPostByIdController = async (req, res) => {
  const id = req.params.id;
  try {
    const data = await FindPostById(id);
    return res.status(200).send({ post: data });
  } catch (error) {
    return res.status(400).send({ error: error.message });
  }
};

const UpdatePostController = async (req, res) => {
  const id = req.params.id;
  const { title, description } = req.body;
  const post = { title, description };
  try {
    const data = await UpdatePostById(id, post);
    return res.status(200).send({ "Post updated": data });
  } catch (error) {
    return res.status(400).send({ error: error.message });
  }
};
const RemovePostController = async (req, res) => {
  const id = req.params.id;
  try {
    await RemovePost(id);
    return res.status(200).send("Post removed with success!");
  } catch (error) {}
};

module.exports = {
  CreatePostController,
  FindPostsController,
  FindPostByIdController,
  UpdatePostController,
  RemovePostController,
};
