import Fuse from "fuse.js";

const options = {
  keys: ["question", "answer"],
};

export const getSearchResults = (docs, searchField) => {
  const fuse = new Fuse(docs, options);
  const searchResult = fuse.search(searchField);

  return searchResult;
};
