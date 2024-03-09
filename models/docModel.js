const mongoose = require("mongoose");

const docSchema = new mongoose.Schema(
  {
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    question: {
      type: String,
      required: [true, "Please add a question"],
    },
    answer: {
      type: String,
      required: [true, "Please add an answer"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Doc", docSchema);
