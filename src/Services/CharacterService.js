const CharacterModel = require("../Models/CharacterModel");
const jwt = require("jsonwebtoken");

//GET  a list of all the uses in the database
const getAllChars = async (req, res, next) => {
  console.log("getAllChars running in CharacterService.js...");
  try {
    const foundCharacters = await CharacterModel.find({});
    console.log("foundCharacters, ", foundCharacters);

    res.send(foundCharacters).status(200);
  } catch (error) {
    console.log("error", error);
  }
};

const addNewCharacter = async (req, res, next) => {
    console.log("addNewCharacter running in CharacterService.js...");

  //Destructure the data we need for a new character, from the request body
  try {
    const {
      charName,
      charLevel,
      charClass,
      charStrength,
      charConstitution,
      charDexterity,
      charWisdom,
      charIntelligence,
      charCharisma,
    } = req.body;

    let newCharacter = new CharacterModel({
      charName: charName,
      charLevel: charLevel,
      charClass: charClass,
      charStrength: charStrength,
      charConstitution: charConstitution,
      charDexterity: charDexterity,
      charWisdom: charWisdom,
      charIntelligence: charIntelligence,
      charCharisma: charCharisma,
    });

    let savedCharacter = await newCharacter.save();

    res.status(200).json({
      message: "New character saved.",
      payload: savedCharacter,
    });
  } catch (error) {
    console.log("Error: ", error);
  }
};

module.exports = {
  getAllChars,
  addNewCharacter,
};
