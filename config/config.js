const mongoose = require("mongoose");
const URL = 'mongodb://0.0.0.0:27017/newecommerceapp';
require("colors");
const connectDb = async () => {
  try {
    const conn = await mongoose.connect(URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    });
    console.log(`Mongodb Connected ${conn.connection.host}`.yellow);
  } catch (error) {
    console.error(`Error : ${error.message}`.red);
    process.exit(1);
  }
};

module.exports = connectDb;
