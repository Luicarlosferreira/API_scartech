const prisma = require("../../prisma/prisma");

const CreatePost = async (data) => {
  const post = await prisma.post.create({
    data,
  });
  return post;
};

const FindPosts = async () => {
  const post = await prisma.post.findMany({});
  return post;
};

const FindPostById = async (id) => {
  const post = await prisma.post.findUnique({
    where: {
      id,
    },
  });
  return post;
};

const UpdatePostById = async (data, id) => {
  const post = await prisma.post.update({
    where: {
      id,
    },
    data,
  });
  return post;
};

const RemovePost = async (id) => {
  await prisma.post.delete({
    where: {
      id,
    },
  });
};

module.exports = {
  CreatePost,
  FindPosts,
  FindPostById,
  UpdatePostById,
  RemovePost,
};
