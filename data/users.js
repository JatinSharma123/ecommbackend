const bcrypt = require("bcryptjs");
const users = [
  {
    name: "Jatin",
    email: "jatin@gmail.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: true,
  },
  {
    name: "Kunal",
    email: "kunal@xyz.com",
    password: bcrypt.hashSync("123456", 10),
  },
  {
    name: "user",
    email: "user@user.com",
    password: bcrypt.hashSync("123456", 10),
  },
];
module.exports = users;
