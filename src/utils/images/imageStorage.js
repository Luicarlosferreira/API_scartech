const cloudinary = require("cloudinary").v2;

// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const UploadImageStorage = async (imageData) => {
  // Upload
  const res = await cloudinary.uploader.upload(imageData);
  return res;
};

module.exports = UploadImageStorage;
