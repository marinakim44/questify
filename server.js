require("dotenv").config();
require("./dbConfig");
const express = require("express");
const cors = require("cors");

const host = "127.0.0.1";
const port = process.env.PORT || 3001;

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/v1/docs", require("./routes/docRoutes"));
app.use("/api/v1/users", require("./routes/userRoutes"));

app.listen(port, host, () => {
  console.log(`Server is running on ${host}:${port}`);
});
