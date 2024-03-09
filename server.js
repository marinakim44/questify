require("dotenv").config();
require("./dbConfig");
const express = require("express");
const cors = require("cors");
const { errorHandler } = require("./middleware/errorMiddleware");
// const jwt = require("jsonwebtoken");
// const JWT_SECRET = process.env.JWT_SECRET;

const host = "127.0.0.1";
const port = process.env.PORT || 3001;

// const { OAuth2Client } = require("google-auth-library");
// const client = new OAuth2Client();

// const mongoose = require("mongoose");
// const { Schema } = mongoose;

// const userSchema = Schema({
//   email: {
//     required: true,
//     unique: true,
//     type: String,
//   },
//   name: {
//     required: true,
//     type: String,
//   },
//   img: {
//     required: false,
//     type: String,
//   },
// });

// const User = mongoose.model("User", userSchema);

// const docSchema = new mongoose.Schema({});
// const Doc = mongoose.model("Doc", docSchema);

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/v1/docs", require("./routes/docRoutes"));
app.use("/api/v1/users", require("./routes/userRoutes"));

// decided to use jwt as we plan to work with multiple apis in the future
// it's more modern but heavier, so we'll combine cookie and jwt
// plus redic for caching and faster request processing
// app.post("/google-auth", async (req, res) => {
//   const { credential, client_id } = req.body;

//   try {
//     const ticket = await client.verifyIdToken({
//       idToken: credential,
//       audience: client_id,
//     });
//     const payload = ticket.getPayload();
//     const userid = payload["sub"];
//     console.log("userid: ", userid);
//     console.log("payload: ", payload.email);

//     let user = await User.findOneAndUpdate(
//       { email: payload.email },
//       { email: payload.email, name: payload.name, img: payload.picture },
//       { upsert: true, new: true }
//     )
//       .then((user) => {
//         const token = jwt.sign({ user }, JWT_SECRET);
//         res
//           .status(200)
//           .cookie("token", token, { http: true })
//           .json({ payload });
//       })
//       .catch((err) => console.log("error: ", err));
//   } catch (err) {
//     res.status(400).json(err);
//   }
// });

// app.get("/api/v1/get-data", (req, res) => {
//   console.log("get data from mongodb");
//   Doc.find()
//     .then((docs) => {
//       console.log("received docs");
//       res.json(docs);
//     })
//     .catch((err) => console.log(err));
// });

app.listen(port, host, () => {
  console.log(`Server is running on ${host}:${port}`);
});
