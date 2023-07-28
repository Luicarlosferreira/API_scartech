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

Route.post("/userCreate", UserAuthentication, CreateUserController);
Route.get("/manage/users", GetAllUsersController);
Route.get("/manage/user/:id", FindUserByIdController);
Route.put("/manage/user/update/:id", UserAuthentication, UpdateUserController);
Route.delete(
  "/manage/user/remove/:id",
  UserAuthentication,
  RemoveUserController
);
Route.post("/user/signin", SignInUser);

module.exports = Route;
