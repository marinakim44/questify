// propose to use Fuse.js for fuzzy search as best suitable for our case
// considering context our database is small and we don't expect large
// datasets of compliance questions + client side rendering and CDN = instant response

// as technical assignment required to implement an API,
// we will use MongoDB fuzzy and vector search in the backend

import Fuse from "fuse.js";
const options = {
  keys: ["question", "answer"],
  includeScore: true,
  minMatchCharLength: 2,
  distance: 1000,
  threshold: 0.5,
  useExtendedSearch: true,
  ignoreFieldNorm: true,
};

export const getSearchResults = (docs, searchField) => {
  console.log("Getting fuzzy search results from fuse.js");
  const fuse = new Fuse(docs, options);
  const searchResult = fuse.search(searchField);

  return searchResult;
};
