const express = require("express");
const UserService = require("../Services/UserService");
const { jwtMiddleware } = require("../authMiddleware/index");

const userRouter = express.Router();

//GET routes
userRouter.get("/get-users", async (req, res, next) => {
  return UserService.getUsers(req, res, next);
});

userRouter.get("/get-current-user", jwtMiddleware, async (req, res, next) => {
  return UserService.getCurrentUser(req, res, next);
});

//PUT routes
userRouter.put("/update-profile", jwtMiddleware, async (req, res, next) => {
    console.log("update profile is hit")
    console.log(req.body)
  return UserService.updateProfile(req, res, next);
});

//POST routes
userRouter.post("/add-new-user", async (req, res, next) => {
  return UserService.addNewUser(req, res, next);
});

userRouter.post("/user-login", async (req, res, next) => {
  return UserService.userLogin(req, res, next);
});

userRouter.post("/user-logout", async (req, res, next) => {
  return UserServuce.userLogOut(req, res, next);
})

//DELETE routes

module.exports = userRouter;
