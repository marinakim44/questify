const mongoose = require("mongoose");

// some database field types can be improved, e.g. createdAt, updatedAt can be automatically
// handled my MongoDB and be a reference to the User model
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
    // below field was created to trigger openai embeddings
    status: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

module.exports = mongoose.model("Doc", docSchema);
