const jwt = require("jsonwebtoken");
const prisma = require("../../prisma/prisma");
const bcrypt = require("bcrypt");
//Sign in Controller

const SignInUser = async (req, res) => {
  const { password, email } = req.body;

  //Verify if email exists.
  const verifyUser = await prisma.user.findFirst({
    where: {
      email: email,
    },
  });
  if (!verifyUser) {
    return res.status(400).send({
      msg: "This Email isn't registered. Please create a new account.",
    });
  }

  //match Passwords
  const matchPassword = bcrypt.compareSync(password, verifyUser.password);
  if (!matchPassword) {
    return res
      .status(400)
      .send({ msg: "Email or password incorrect. Try again!" });
  }
  const tokenData = {
    adminCheck: verifyUser.isAdmin,
    auth: "auth",
  };

  try {
    const token = jwt.sign(tokenData, process.env.SECRET_JWT);
    res.header("auth", token);
    return res.status(200).send({ msg: "User Logged!" });
  } catch (error) {
    return res.status(400).send({ msg: error.message });
  }
};

module.exports = SignInUser;
