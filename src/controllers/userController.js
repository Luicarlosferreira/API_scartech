const prisma = require("../../prisma/prisma");
const bcrypt = require("bcrypt");
const {
  CreateUser,
  FindUser,
  FindUserById,
  UpdateUserById,
  RemoveUser,
} = require("../repositories/user");

const CreateUserController = async (req, res) => {
  const { email, password, isAdmin } = req.body;
  const verifyUser = await prisma.user.findFirst({
    where: {
      email: email,
    },
  });
  if (verifyUser) {
    return res
      .status(400)
      .send({ error: "user already exists. Please, try another user." });
  }

  try {
    const user = {
      email: email,
      password: bcrypt.hashSync(password, 5),
      isAdmin: isAdmin,
    };
    const data = await CreateUser(user);
    return res.status(200).send({ "user created with success": data });
  } catch (error) {
    return res.status(400).send({
      error,
    });
  }
};

const GetAllUsersController = async (req, res) => {
  try {
    const data = await FindUser();
    if (data.length > 0) {
      return res.status(200).send({ users: data });
    } else return res.status(200).send({ msg: "There's no users registered." });
  } catch (error) {
    return res.status(400).send({ msg: error.message });
  }
};

const FindUserByIdController = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await FindUserById(id);
    return res.status(200).send({ user: data });
  } catch (error) {
    return res.status(400).send({ msg: error.message });
  }
};

const UpdateUserController = async (req, res) => {
  const { email, password, isAdmin } = req.body;
  const id = req.params.id;
  try {
    const user = {
      email: email,
      password: password && bcrypt.hashSync(password, 5),
      isAdmin,
    };

    const data = await UpdateUserById(user, id);
    return res.status(200).send({ "user updated": data });
  } catch (error) {
    return res.status(400).send({ msg: error.message });
  }
};

const RemoveUserController = async (req, res) => {
  const id = req.params.id;
  try {
    await RemoveUser(id);
    return res.status(200).send({ msg: "user deleted with success!" });
  } catch (error) {
    return res.status(400).send({ msg: error.message });
  }
};
module.exports = {
  CreateUserController,
  GetAllUsersController,
  FindUserByIdController,
  UpdateUserController,
  RemoveUserController,
};
