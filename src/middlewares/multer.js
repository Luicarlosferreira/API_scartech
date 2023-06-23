const multer = require("multer");
const uploadMulter = multer({ dest: "./public/data/uploads/" });

module.exports = uploadMulter;
