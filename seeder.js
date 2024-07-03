const mongoose = require("mongoose");
const dotenv = require("dotenv");
require("colors");
const users = require("./data/users");
const User = require("./models/UserModel");
const Product = require("./models/ProductModel");
const Order = require("./models/OrderModel");
const products = require("./data/products");
const products2 = require("./data/pro");
const connectDb = require("./config/config");

dotenv.config();
//connectDb();

const importData = async () => {
    try {
    console.log("hello");
    await Order.deleteMany();
    await Product.deleteMany();
   await User.deleteMany();
    const createUser = await User.insertMany(users);
    const adminUser = createUser[0]._id;
    const sampleData = products.map((product) => {
      return { ...product, user: adminUser };
    });
    const sampleData2 = products2.map((product) => {
      return { ...product, user: adminUser };
    });
    await Product.insertMany(sampleData);
    await Product.insertMany(sampleData2);
    console.log("Data Imported!!".green.inverse);
    process.exit();
  } catch (error) {
    console.log(`${error}`.red.inverse);
    process.exit(1);
  }
};
// importData();
const dataDestory = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();
    console.log("Data Destory".green.inverse);
    process.exit();
  } catch (error) {
    console.log(`${error}`.red.inverse);
    process.exit(1);
  }
};

// if (process.argv[2] === "-d") {
//   dataDestory();
// } else {
//   importData();
// }
module.exports = importData;
