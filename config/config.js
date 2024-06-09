const mongoose = require("mongoose");
const importData = require("../seeder");
const URL = 'mongodb://0.0.0.0:27017/newecommerceapp';
const newurl='mongodb://mongo:dotXcmBwARjqTKwkgDuGNZZqBVoEuNuS@monorail.proxy.rlwy.net:45539'
//const URL="mongodb+srv://jatinsh123123:lEhk6lFLIIYnH3Zt@cluster0.5ypnfps.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
require("colors");
const connectDb = async () => {
  try {
    const conn = await mongoose.connect(newurl, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    });
    
    console.log(`Mongodb Connected ${conn.connection.host}`.yellow);
    //importData();
  } catch (error) {
    console.error(`Error : ${error.message}`.red);
    process.exit(1);
  }

};

module.exports = connectDb;
