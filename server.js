const express = require("express");
const { errorHandler } = require("./middlewares/errorMiddleware");
require("colors");
//const products = require("./data/products");
const dotenv = require("dotenv");
const connectDb = require("./config/config");
const productRoutes = require("./routes/productsRoute");
const usersRoutes = require("./routes/UsersRoute");
const orderRoutes = require("./routes/orderRoute");
// //const importData = require("./seeder");
const cors = require("cors");
dotenv.config();

//console.log("hello there");
//connecting to mongodb database
//connectDb()

const app = express();
//middleware bodyparser
app.use(express.json());
app.use(cors());

//dotenv config
app.get("/", (req, res) => {
  res.send("<h1>Welcome to Node Server</h1>");
});

app.use("/api", productRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/orders", orderRoutes);
app.get("/api/config/paypal", (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID);
});

app.use(errorHandler);

const PORT = 5000;
app.listen(PORT, () => {
  connectDb();

  console.log(`Server Running in ${PORT} Mode on Port ${PORT}`.inverse);
});
