const UserModel = require("../Models/UserModel");




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

const addNewUser = (req, res, next) => {
  //Get new-user data from the request

  console.log("addNewUser running");

  try {
    const { firstName, lastName, username, password } = req.body;

    console.log("firstName, ", firstName);
    console.log("lastName, ", lastName);
    console.log("username, ", username);
    console.log("password, ", password);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

module.exports = {
  getUsers,
  addNewUser,
};
