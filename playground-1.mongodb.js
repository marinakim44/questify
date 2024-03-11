use("questify-db");

db.docs.aggregate([
  {
    $search: {
      index: "custom",
      text: {
        query: "vercel",
        path: ["question", "questionDesc", "answer"],
        fuzzy:{},
      },
    },
    {
      $project: {
        "_id": 0,
        "title": 1,
        score: { $meta: "searchScore" }
      }
    }
  },
]);
