const UserModel = require("../Models/UserModel");
const bcrypt = require("bcryptjs");

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

const addNewUser = async (req, res, next) => {
  //Get new-user data from the request
  try {
    const { firstName, lastName, username, password } = req.body;

    // console.log("firstName, ", firstName);
    // console.log("lastName, ", lastName);
    // console.log("username, ", username);
    // console.log("password, ", password);

    let salt = await bcrypt.genSalt(10);
    let hashedPassword = await bcrypt.hash(password, salt);

    let newUser = new UserModel({
      firstName: firstName,
      lastName: lastName,
      username: username,
      password: hashedPassword,
    });

    let savedUser = await newUser.save();

    res.status(200).json({
      message: "New user saved.",
      payload: savedUser,
    });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

module.exports = {
  getUsers,
  addNewUser,
};
