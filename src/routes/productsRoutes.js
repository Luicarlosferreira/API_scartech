const express = require("express");
const Route = express.Router();

const {
  CreateProductController,
  FindProductByIdController,
  FindProductsController,
  RemoveProductController,
  UpdateProductController,
} = require("../controllers/productController");

Route.post("/product/create", CreateProductController);
Route.get("/product/:id", FindProductByIdController);
Route.get("/products", FindProductsController);
Route.post("/product/update/:id", UpdateProductController);
Route.delete("/product/remove/:id", RemoveProductController);

module.exports = Route;
