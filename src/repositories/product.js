const prisma = require("../../prisma/prisma");

const CreateProduct = async (data) => {
  const product = await prisma.product.create(data);
  return product;
};

const FindProducts = async () => {
  const product = await prisma.product.findMany({});
  return product;
};

const FindProductById = async (id) => {
  const product = await prisma.product.findUnique({
    where: {
      id,
    },
  });
  return product;
};

const UpdateProductById = async (data, id) => {
  const product = await prisma.product.update({
    where: {
      id,
    },
    data,
  });
  return product;
};

const RemoveProduct = async (id) => {
  await prisma.product.delete({
    where: {
      id,
    },
  });
};

module.exports = {
  CreateProduct,
  FindProducts,
  FindProductById,
  UpdateProductById,
  RemoveProduct,
};
