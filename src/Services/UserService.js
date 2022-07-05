const UserModel = require("../Models/UserModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//GET  a list of all the uses in the database
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

//GET the current user using JSONWEBTOKEN
const getCurrentUser = async (req, res, next) => {
  try {
    const { decodedToken } = res.locals;

    const foundUser = await UserModel.findOne({
      email: decodedToken.email,
    });

    res
      .status(200)
      .json({ message: "Current User Data provided!", payload: foundUser });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

//POST add a new user to the database
const addNewUser = async (req, res, next) => {
  //Get new-user data from the request
  try {
    const { firstName, lastName, username, password, email } = req.body;

    //Hash the password entered by the user.
    //the password var here, should never be called again
    let salt = await bcrypt.genSalt(10);
    let hashedPassword = await bcrypt.hash(password, salt);

    //newUser is shaped like our usermodel, data comes from req.body
    let newUser = new UserModel({
      firstName: firstName,
      lastName: lastName,
      username: username,
      password: hashedPassword,
      email: email,
    });

    //SAVE the new user to the mongo database
    let savedUser = await newUser.save();

    res.status(200).json({
      message: "New user saved.",
      payload: savedUser,
    });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

//POST LOG-IN an active user
const userLogin = async (req, res, next) => {
  console.log("beginning userLogin");
  try {
    //user will send a login request, with their email and UNHASHED password
    const { email, password } = req.body.credentials;

    console.log(email, " + ", password);

    //search the database for a profile, with an email field that matches what
    //was input by the user
    const foundUser = await UserModel.findOne({ email: email });

    //if founduser is null, it's because nothing was found. wrong email error.
    if (foundUser === null)
      throw { message: "This email address was not found." };

    //use bcrypt to compare the user input 'password', with what we have stored
    //in our database. We have the HASHED password. Only bcrypt can verify if these
    //match perfectly.
    const comparedPassword = await bcrypt.compare(password, foundUser.password);

    //error message, comparedPassword will only be 'true' if the passwords match
    if (!comparedPassword)
      throw { message: "This email & password do not match." };

    const jwtToken = jwt.sign(
      {
        email: foundUser.email,
      },
      process.env.SECRET_KEY,
      { expiresIn: "8h" }
    );

    // res.cookie("session_token", jwtToken, { httpOnly: true, secure: false });

    res.status(200).json({ payload: jwtToken })
    // res.status(200).json({ jwtToken });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

const userLogOut = async (req, res, next) => {
  try {
    console.log("logging out user...");
    res.clearCookie("session_token").send("User logged out.");
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

//PUT update user profile if logged in
const updateProfile = async (req, res, next) => {
  try {
    const decodedToken = res.locals.decodedToken;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    req.body.password = hashedPassword;
    const updatedProfile = await User.findOneAndUpdate(
      { email: decodedToken.email },
      req.body,
      { new: true }
    );

    res
      .status(200)
      .json({ message: "Profile has been updated.", payload: updatedProfile });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

module.exports = {
  getUsers,
  addNewUser,
  userLogin,
  getCurrentUser,
  updateProfile,
  userLogOut,
};
