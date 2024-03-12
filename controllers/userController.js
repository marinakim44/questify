const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client();
const User = require("../models/userModel");

const registerUser = (req, res) => {
  res.json({ message: "Register user" });
};

const loginUser = async (req, res) => {
  const { credential, client_id } = req.body;

  try {
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: client_id,
    });
    const payload = ticket.getPayload();

    // if (
    //   ![
    //     "marina.kim.mk90@gmail.com",
    //     "marinamuse4490@gmail.com",
    //     "mkim@rcgroup.online",
    //   ].includes(payload.email)
    // ) {
    //   return res
    //     .status(401)
    //     .json({ message: "You are not authorized to view this page" });
    // }

    let user = await User.findOneAndUpdate(
      { email: payload.email },
      { email: payload.email, name: payload.name, img: payload.picture },
      { upsert: true, new: true }
    )
      .then((user) => {
        const token = jwt.sign({ user }, JWT_SECRET);
        res
          .status(200)
          // .cookie("token", token, { http: true })
          .json({ payload, token });
      })
      .catch((err) => console.log("error: ", err));
  } catch (err) {
    res.status(400).json(err);
  }
};

const getUser = (req, res) => {
  res.json({ message: "User data" });
};

const getUsers = async (req, res) => {
  await User.find({})
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((err) => res.status(400).json(err));
  // res.json({ message: "Users data" });
};

module.exports = { registerUser, loginUser, getUser, getUsers };
