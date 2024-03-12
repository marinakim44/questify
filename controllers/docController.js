require("dotenv").config();
const axios = require("axios");
const asyncHandler = require("express-async-handler");
const OPENAI_KEY = process.env.OPENAI_KEY;
const MONGODB_URI = process.env.MONGODB_URI;

// had to use native mongodb driver to use vector search

const MongoClient = require("mongodb").MongoClient;

const Doc = require("../models/docModel");

const getDocs = asyncHandler(async (req, res) => {
  const docs = await Doc.find({});
  res.status(200).json(docs);
});

const getDoc = asyncHandler(async (req, res) => {
  const doc = await Doc.findById(req.params.id);

  if (!doc) {
    res.status(400);
    throw new Error("Document not found");
  }

  res.status(200).json(doc);
});

const addDoc = asyncHandler(async (req, res) => {
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

  if (!doc) {
    res.status(400);
    throw new Error("Document not found");
  }

  res.status(200).json(doc);
});

const deleteDoc = asyncHandler(async (req, res) => {
  // await doc.remove();
  await Doc.findByIdAndDelete(req.params.id);

  res.status(200).json({ id: req.params.id });
});

async function getEmbedding(query) {
  const url = "https://api.openai.com/v1/embeddings";

  // chose this model for speed, performance and i quote
  // "text-embedding-ada-002 is a new embedding model from OpenAI that replaces five separate models for text search, text similarity, and code search"
  let response = await axios.post(
    url,
    {
      input: query,
      model: "text-embedding-ada-002",
    },
    {
      headers: {
        Authorization: `Bearer ${OPENAI_KEY}`,
        "Content-Type": "application/json",
      },
    }
  );

  if (response.status === 200) {
    return response.data.data[0].embedding;
  } else {
    throw new Error("Failed to get embedding. Status code: " + response.status);
  }
}

async function findSimilarDocuments(embedding) {
  const client = new MongoClient(MONGODB_URI);
  try {
    await client.connect();
    const db = client.db("questify-ai-db");
    const collection = db.collection("docs");

    const documents = await collection
      .aggregate([
        {
          $vectorSearch: {
            queryVector: embedding,
            path: "embedding",
            numCandidates: 100,
            limit: 5,
            index: "questifyIndex",
          },
        },
      ])
      .toArray();

    return documents;
  } catch (err) {
    console.error(err);
  }
}

async function main(query) {
  try {
    const embedding = await getEmbedding(query);
    const documents = await findSimilarDocuments(embedding);

    return documents;
  } catch (err) {
    console.error(err);
  }
}

const getSemanticResults = asyncHandler(async (req, res) => {
  const query = req.body.searchValue;

  const foundDocuments = await main(query);

  if (!foundDocuments) {
    res.status(400);
    throw new Error(
      "No documents found, probably openai api limit reached. Try again later"
    );
  }

  res.status(200).json(foundDocuments);
});

const getFuzzyResults = asyncHandler(async (req, res) => {
  const query = req.body.searchValue;

  const foundDocuments = await Doc.aggregate([
    {
      $search: {
        index: "questifyFuzzyIndex",
        text: {
          query: query,
          path: ["question", "questionDesc", "answer"],
          fuzzy: {
            prefixLength: 2,
          },
        },
      },
    },
  ]);

  if (!foundDocuments) {
    res.status(400);
    throw new Error("No documents found");
  }

  res.status(200).json(foundDocuments);
});

module.exports = {
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  getSemanticResults,
  getFuzzyResults,
};
