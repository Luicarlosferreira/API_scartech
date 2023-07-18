const { MongoClient } = require("mongodb");
const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const UserRoute = require("./src/routes/userRoutes");
const ProductRoute = require("./src/routes/productsRoutes");
const PostRoute = require("./src/routes/postsRoutes");

const PORT = process.env.PORT | 8000;
const uri = process.env.MONGO_CONNECTION_STRING;
const client = new MongoClient(uri);

app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ limit: "100mb" }));
app.use(cors());

// app.use(
//     cors({
//       origin: "ClientDNS",
//       optionsSuccessStatus: 200,
//     })
//   );
app.use("/", UserRoute, ProductRoute, PostRoute);

client.connect((err) => {
  if (err) {
    console.error(err);
    return false;
  }
  // connection to mongo is successful, listen for requests
  app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
  });
});
