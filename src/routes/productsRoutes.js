const express = require("express");
const Route = express.Router();
const UserAuthentication = require("../middlewares/authentication");

const {
  CreateProductController,
  FindProductByIdController,
  FindProductsController,
  RemoveProductController,
  UpdateProductController,
} = require("../controllers/productController");

Route.post("/productCreate", UserAuthentication, CreateProductController);
Route.get("/product/:id", FindProductByIdController);
Route.get("/products", FindProductsController);
Route.post("/product/update/:id", UserAuthentication, UpdateProductController);
Route.delete(
  "/product/remove/:id",
  UserAuthentication,
  RemoveProductController
);

module.exports = Route;
