const express = require("express");
const CharacterService = require("../Services/CharacterService");
const { jwtMiddleware } = require("../authMiddleware/index");

const characterRouter = express.Router();

//GET routes
characterRouter.get("/get-all-chars", async (req, res, next) => {
  return CharacterService.getAllChars(req, res, next);
});

//PUT routes

//POST routes
characterRouter.post("/add-new-character", async (req, res, next) => {
  return CharacterService.addNewCharacter(req, res, next);
});

//DELETE routes

module.exports = characterRouter;
