const asyncHandler = require("express-async-handler");

const Doc = require("../models/docModel");

const getDocs = asyncHandler(async (req, res) => {
  const docs = await Doc.find({});
  res.status(200).json(docs);
});

const addDoc = asyncHandler(async (req, res) => {
  if (!req.body.question) {
    res.status(400);
    throw new Error("Please add question");
  }

  const doc = await Doc.create({
    createdBy: req.user.id,
    question: req.body.question,
    questionDesc: req.body.desc,
    answer: req.body.answer,
    assignedTo: req.body.assignedTo,
    companyName: req.body.company,
    properties: req.body.properties,
  });

  res.status(200).json(doc);
});

const updateDoc = asyncHandler(async (req, res) => {
  const doc = await Doc.findById(req.params.id);

  if (!doc) {
    res.status(400);
    throw new Error("Document not found");
  }

  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  if (doc.createdBy.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  const updatedDoc = await Doc.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updatedDoc);
});

const deleteDoc = asyncHandler(async (req, res) => {
  const doc = await Doc.findById(req.params.id);

  if (!doc) {
    res.status(400);
    throw new Error("Document not found");
  }

  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }
  if (doc.createdBy.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  await doc.remove();

  res.status(200).json({ id: req.params.id });
});

module.exports = { getDocs, addDoc, updateDoc, deleteDoc };
