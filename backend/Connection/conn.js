const mongoose = require("mongoose");
require("dotenv").config(); // load .env variables

const uri = process.env.MONGODB_URI; // get connection string from env

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log(" DB connection successful"))
  .catch((err) => {
    console.error(" DB connection error:", err);
  });