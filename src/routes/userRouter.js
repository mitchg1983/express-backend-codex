const express = require("express");
const UserService = require("../Services/UserService");

const userRouter = express.Router();

userRouter.get("/get-users", async (req, res, next) => {
  console.log("Your get-users Route is here!");
  return UserService.getUsers(req, res, next);
});

userRouter.post("/add-new-user", async (req, res, next) => {
  console.log("Your add-new-user Route is here!");
  return UserService.addNewUser(req, res, next);
});

module.exports = userRouter;
