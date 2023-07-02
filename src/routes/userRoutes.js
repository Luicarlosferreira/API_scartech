const express = require("express");
const Route = express.Router();
const UserAuthentication = require("../middlewares/authentication");
const {
  CreateUserController,
  GetAllUsersController,
  FindUserByIdController,
  UpdateUserController,
  RemoveUserController,
} = require("../controllers/userController");
const SignInUser = require("../controllers/signInController");

Route.post("/userCreate", CreateUserController);
Route.get("/manage/users", UserAuthentication, GetAllUsersController);
Route.get("/manage/user/:id", UserAuthentication, FindUserByIdController);
Route.put("/manage/user/update/:id", UserAuthentication, UpdateUserController);
Route.delete(
  "/manage/user/remove/:id",
  UserAuthentication,
  RemoveUserController
);
Route.post("/user/signin", SignInUser);

module.exports = Route;
