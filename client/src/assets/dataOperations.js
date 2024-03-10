export const filterDocuments = (docs, searchField) => {
  return docs.filter(
    (doc) =>
      doc.question.toLowerCase().includes(searchField) ||
      doc.answer.toLowerCase().includes(searchField)
  );
};

export const sortDocuments = (docs, sortField, order) => {
  if (order === "asc") {
    return docs.sort((a, b) => a[sortField].localeCompare(b[sortField]));
  } else if (order === "desc") {
    return docs.sort((a, b) => b[sortField].localeCompare(a[sortField]));
  }
  return "Invalid order";
};

export const removeDups = (arr) => [...new Set(arr)];
