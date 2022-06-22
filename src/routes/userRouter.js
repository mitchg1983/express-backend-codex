const express = require('express');
const UserService = require("../Services/UserService")

const userRouter = express.Router();

userRouter.get("/get-users", async (req, res, next) => {
    console.log("Your get-users Route is here!");
    return UserService.getUsers(req, res, next);
});

module.exports = userRouter;