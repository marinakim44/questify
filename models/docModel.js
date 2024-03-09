const mongoose = require("mongoose");

const docSchema = new mongoose.Schema(
  {
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    updatedBy: {
      type: String,
      required: false,
    },
    question: {
      type: String,
      required: [true, "Please add a question"],
    },
    questionDesc: {
      type: String,
      required: false,
    },
    answer: {
      type: String,
      required: false,
    },
    assignedTo: {
      type: String,
      required: false,
    },
    companyName: {
      type: String,
      required: false,
    },
    properties: {
      type: Array,
      required: false,
    },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

module.exports = mongoose.model("Doc", docSchema);
