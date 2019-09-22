const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const config = require("config");
const port = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(express.json());

const db = config.get("mongoURI");

mongoose
  .connect(db, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

app.listen(port, () => console.log(`Listening on port ${port}`));