require("dotenv").config();
const express = require("express");
const userRouter = require("./routes/userRouter");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 4444;

mongoose
  .connect(process.env.DB_CONNECTION_STRING)
  .then(() => console.log("Connected to MongoDB successfully."))
  .catch(() => console.log("Unable to connect to MongoDB..."));

//Parsing Cookies
app.use((req, res, next) => {
  console.log(
    "Parsing your cookies from their native format, to a developer friendly format."
  );
  next();
});

//Parsing JSON
app.use((req, res, next) => {
  console.log("Parsing your request into JSON we can work with it.");
  next();
});

//CORS Policy
app.use(cors());

//Authorization
app.use((req, res, next) => {
  console.log("--userAuthorization middleware--");
  next();
});

app.use(userRouter);

app.get("/", () => {
  console.log("@@Main route hit!@@");
});

app.listen(PORT, () => {
  console.log(`|||| Backend listening on port #${PORT} ||||`);
});
