require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const userRouter = require("./routes/userRouter");
const characterRouter = require("./routes/characterRouter")
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 4444;

mongoose
  .connect(process.env.DB_CONNECTION_STRING)
  .then(() => console.log("Connected to MongoDB successfully."))
  .catch(() => console.log("Unable to connect to MongoDB..."));

//Parsing Cookies
app.use(cookieParser());

//CORS Policy
app.use(cors());

//Body parser
app.use(bodyParser.json());

//Parsing JSON
app.use((req, res, next) => {
  //   console.log("Parsing your request into JSON we can work with it.");
  next();
});

//Authorization
app.use((req, res, next) => {
  //   console.log("--userAuthorization middleware--");
  next();
});

app.use(userRouter);

app.use(characterRouter);

app.get("/", () => {
  console.log("@@Main route hit!@@");
});

app.listen(PORT, () => {
  console.log(`|||| Backend listening on port #${PORT} ||||`);
});
