require("dotenv").config();
const http = require("node:http");
const express = require("express"); // Add the missing import statement for express
const cors = require("cors");
const mongoose = require("mongoose");
const host = "127.0.0.1";
const port = process.env.PORT || 3001;
const db = process.env.MONGODB_URI;

// db connection
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

const docSchema = new mongoose.Schema();
const Doc = mongoose.model("Doc", docSchema);

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Express server");
});

app.get("/api/get-data", (req, res) => {
  console.log("get data from db");
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
