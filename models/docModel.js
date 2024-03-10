const mongoose = require("mongoose");

const docSchema = new mongoose.Schema(
  {
    createdBy: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date || String,
      required: true,
    },
    updatedBy: {
      type: String,
      required: false,
    },
    updatedAt: {
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
