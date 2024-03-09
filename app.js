require("dotenv").config();
require("./dbConfig");
const express = require("express");
const session = require("express-session");
const cors = require("cors");

const host = "127.0.0.1";
const port = process.env.PORT || 3001;

const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client();
const mongoose = require("mongoose");

const docSchema = new mongoose.Schema({});
const Doc = mongoose.model("Doc", docSchema);

const app = express();
app.use(express.json());
app.use(cors());

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

app.post("/google-auth", async (req, res) => {
  const { credential, client_id } = req.body;

  try {
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: client_id,
    });
    const payload = ticket.getPayload();
    const userid = payload["sub"];
    console.log("userid: ", userid);
    res.status(200).json({ payload });
  } catch (err) {
    res.status(400).json(err);
  }
});

app.get("/api/v1/get-data", (req, res) => {
  console.log("get data from mongodb");
  Doc.find()
    .then((docs) => {
      console.log("received docs");
      res.json(docs);
    })
    .catch((err) => console.log(err));
});

app.listen(port, host, () => {
  console.log(`Server is running on ${host}:${port}`);
});
