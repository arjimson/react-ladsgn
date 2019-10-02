const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const config = require("config");
const port = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(express.json());

// const db = config.get("mongoURI");

// mongoose
//   .connect(db, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
//   .then(() => console.log("MongoDB connected"))
//   .catch(err => console.log(err));

// if in production
const path = require("path");
if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    })
}

const posts = require('./routes/api/posts');

app.use(express.static(__dirname));
app.use('/api/posts', posts);

app.listen(port, () => console.log(`Listening on port ${port}`));