const mongoose = require("mongoose");


//Data shape for standard character built by a user
const characterSchema = new mongoose.Schema({
  charName: { type: String, required: true },
  charLevel: { type: Number, required: true },
  charClass: { type: String, required: true },
  charStrength: { type: Number, required: true },
  charConstitution: { type: Number, required: true },
  charDexterity: { type: Number, required: true },
  charWisdom: { type: Number, required: true },
  charIntelligence: { type: Number, required: true },
  charCharisma: { type: Number, required: true },
  //convert this to a link to the user in the DB and then populate
  // createdBy: { type: String, required: true },
});

const CharacterModel = mongoose.model("character", characterSchema);

module.exports = CharacterModel;
