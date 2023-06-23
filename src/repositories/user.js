const prisma = require("../../prisma/prisma");

const CreateUser = async (data) => {
  const user = await prisma.user.create({
    data,
  });
  return user;
};

const FindUser = async () => {
  const user = await prisma.user.findMany();
  return user;
};

const FindUserById = async (id) => {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });
  return user;
};
const UpdateUserById = async (data, id) => {
  const user = await prisma.user.update({
    where: {
      id: id,
    },
    data: data,
  });
  return user;
};

const RemoveUser = async (id) => {
  await prisma.user.delete({
    where: { id },
  });
  return;
};

module.exports = {
  CreateUser,
  FindUser,
  FindUserById,
  UpdateUserById,
  RemoveUser,
};
