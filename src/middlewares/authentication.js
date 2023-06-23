const jwt = require("jsonwebtoken");

const UserAuthentication = async (req, res, next) => {
  const token = req.header("auth");
  if (!token) {
    return res.status(400).send({ msg: "Bad request. Try again." });
  }
  const authentication = jwt.verify(token, process.env.SECRET_JWT);
  req.user = authentication;

  if (req.user.adminCheck) {
    next();
  } else {
    return res.status(400).send({ msg: "Bad credentials. Try again." });
  }
};

module.exports = UserAuthentication;
