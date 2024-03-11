use("questify-db");

db.docs.aggregate([
  {
    $search: {
      index: "custom",
      text: {
        query: "email",
        path: ["question", "questionDesc", "answer", "properties"],
      },
    },
  },
]);
