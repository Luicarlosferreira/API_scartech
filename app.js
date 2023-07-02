const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const UserRoute = require("./src/routes/userRoutes");
const ProductRoute = require("./src/routes/productsRoutes");
const PostRoute = require("./src/routes/postsRoutes");
const bodyParser = require("body-parser");

const PORT = process.env.PORT | 8000;

app.use(express.json());
app.use(bodyParser.json({ limit: "100mb" }));
app.use(
  bodyParser.urlencoded({
    // to support URL-encoded bodies
    limit: "100mb",
    extended: true,
  })
);
app.use(cors());

// app.use(
//     cors({
//       origin: "ClientDNS",
//       optionsSuccessStatus: 200,
//     })
//   );
app.use("/", UserRoute, ProductRoute, PostRoute);

app.listen(PORT, () => console.log(`server is running on port ${PORT}`));
