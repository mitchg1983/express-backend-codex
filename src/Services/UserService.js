const UserModel = require("../Models/UserModel");

//Do I need this?
// const bodyParser = require("body-parser");

const getUsers = async (req, res, next) => {
  //logic to get users from database
  console.log("getUsers running in UserService.js...");
  try {
    const foundUsers = await UserModel.find({});
    console.log("foundUsers, ", foundUsers);

    res.send(foundUsers).status(200);
  } catch (error) {
    console.log("error", error);
  }
};

module.exports = {
  getUsers,
};
