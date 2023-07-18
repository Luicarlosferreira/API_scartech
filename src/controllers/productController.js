const {
  CreateProduct,
  FindProductById,
  FindProducts,
  RemoveProduct,
  UpdateProductById,
} = require("../repositories/product");

const cloudinary = require("../utils/images/imageStorage");

const CreateProductController = async (req, res) => {
  const { category, title, price, description, image } = req.body;

  try {
    const resultImage = await cloudinary.uploader.upload(image, {
      folder: "products",
      width: 500,
      height: 500,
      crop: "fill",
    });
    const imageData = {
      id: resultImage.public_id,
      url: resultImage.secure_url,
    };
    const data = await CreateProduct({
      category,
      title,
      price,
      description,
      image: imageData,
    });
    return res.status(200).send({ "product Created": data });
  } catch (error) {
    return res.status(404).send({ msg: error.message });
  }
};

const RemoveProductController = async (req, res) => {
  const id = req.params.id;

  try {
    //data id to push imageId
    const data = await FindProductById(id);
    const imageId = data.image[0].id;

    await cloudinary.uploader.destroy(imageId);
    await RemoveProduct(id);

    return res.status(200).send({ msg: "product deleted with sucess." });
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
  const { category, title, price, description } = req.body;
  const update = {
    category,
    title,
    price,
    description,
  };
  const id = req.params.id;
  try {
    await UpdateProductById(id, update);
    return res
      .status(200)
      .send({ UpdatedProduct: "product updated with success." });
  } catch (error) {
    return res.status(400).send({ error: error.message });
  }
};
module.exports = {
  CreateProductController,
  FindProductsController,
  FindProductByIdController,
  UpdateProductController,
  RemoveProductController,
};
