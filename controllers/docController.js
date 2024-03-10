const asyncHandler = require("express-async-handler");

const Doc = require("../models/docModel");

const getDocs = asyncHandler(async (req, res) => {
  const docs = await Doc.find({});
  res.status(200).json(docs);
});

const getDoc = asyncHandler(async (req, res) => {
  const doc = await Doc.findById(req.params.id);
  console.log("doc: ", doc);

  if (!doc) {
    res.status(400);
    throw new Error("Document not found");
  }

  res.status(200).json(doc);
});

const addDoc = asyncHandler(async (req, res) => {
  console.log("adding new doc: ", req.body);
  if (!req.body.question) {
    res.status(400);
    throw new Error("Please add question");
  }

  const doc = await Doc.create({
    createdBy: req.user.email,
    createdAt: new Date(),
    question: req.body.question,
    questionDesc: req.body.questionDesc,
    answer: req.body.answer,
    assignedTo: req.body.assignedTo,
    companyName: req.body.company,
    properties: req.body.properties,
  });

  res.status(200).json(doc);
});

const updateDoc = asyncHandler(async (req, res) => {
  console.log("req user: ", req.user);
  // const doc = await Doc.findById(req.params.id);
  console.log(req.body);
  const doc = await Doc.findByIdAndUpdate(
    req.params.id,
    Object.assign({}, req.body, {
      updatedBy: req.user.email,
      updatedAt: new Date(),
    }),
    {
      new: true,
      runValidators: true,
    }
  );

  console.log("updated doc: ", doc);

  if (!doc) {
    res.status(400);
    throw new Error("Document not found");
  }

  res.status(200).json(doc);
});

const deleteDoc = asyncHandler(async (req, res) => {
  console.log("deleting doc: ", req.params.id);
  // await doc.remove();
  await Doc.findByIdAndDelete(req.params.id);

  res.status(200).json({ id: req.params.id });
});

module.exports = { getDocs, getDoc, addDoc, updateDoc, deleteDoc };
