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

// nedb
const Datastore = require('nedb');
const sample = new Datastore({ filename: './nedb/sample.db', autoload: true })

let user = {
  name: 'Julie',
  email: 'lalata.remo@gmail.com'
}

// insert
sample.insert(user, (err, doc) => {
  console.log('Inserted', doc.name)
});

// find
sample.find({}, (err, doc) => {
  doc.map((d) => {
    console.log('Found user: ', d.name)
  })
})


// if in production
const path = require("path");
if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    })
}

app.listen(port, () => console.log(`Listening on port ${port}`));