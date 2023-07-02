const {
  CreateProduct,
  FindProductById,
  FindProducts,
  RemoveProduct,
  UpdateProductById,
} = require("../repositories/product");

const cloudinary = require("../utils/images/imageStorage");

const CreateProductController = async (req, res) => {
  const { category, title, price, brand, image } = req.body;

  try {
    const resultImage = await cloudinary.uploader.upload(
      { image },
      {
        folder: product,
      }
    );

    const data = await CreateProduct({
      category,
      title,
      price,
      brand,
      imageUrl: [
        {
          _id: resultImage.public_id,
          url: resultImage.secure_url,
        },
      ],
    });
    return res.status(200).send({ "product Created": data });
  } catch (error) {
    return res.status(400).send({ msg: error.message });
  }
};

const FindProductsController = async (req, res) => {
  try {
    const data = await FindProducts();
    return res.status(200).send({ Products: data });
  } catch (error) {
    return res.status(400).send({ error: error.message });
  }
};

const FindProductByIdController = async (req, res) => {
  const id = req.params.id;
  try {
    const data = await FindProductById(id);
    return res.status(200).send({ product: data });
  } catch (error) {
    return res.status(400).send({ error: error.message });
  }
};

const UpdateProductController = async (req, res) => {
  const { category, title, price } = req.body;
  const id = req.params.id;
  const product = { category, title, price };
  try {
    const data = await UpdateProductById(id, product);
    return res.status(200).send({ updated: data });
  } catch (error) {
    return res.status(400).senD({ error: error.message });
  }
};
const RemoveProductController = async (req, res) => {
  const id = req.params.id;
  try {
    await RemoveProduct(id);
    return res.status(200).send({ msg: "product deleted with sucess." });
  } catch (error) {
    return res.status(400).send({ msg: error.message });
  }
};
module.exports = {
  CreateProductController,
  FindProductsController,
  FindProductByIdController,
  UpdateProductController,
  RemoveProductController,
};
