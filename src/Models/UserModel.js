const mongoose = require("mongoose");
// const { v4: uuidv4 } = require("uuid");

// let testUUID = uuidv4();
// console.log("testUUID", testUUID);

const userSchema = new mongoose.Schema({
  // id: { type: String, required: true, default: () => uuid.v4() },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  created: { type: Date, required: true, default: new Date() },
});

const UserModel = mongoose.model("user", userSchema);

module.exports = UserModel;
