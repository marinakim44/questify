const mongoose = require("mongoose");

const docSchema = new mongoose.Schema({});
const Doc = mongoose.model("Doc", docSchema);

module.exports = Doc;
