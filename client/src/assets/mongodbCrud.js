export const getQuestionsFromMongo = async (jwt) => {
  console.log("Retrieving documents from mongodb");
  const response = await fetch(
    `${process.env.REACT_APP_BASE_URL_DEV}api/v1/docs`,
    {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    }
  );

  return response.json();
};

export const getDocumentFromMongo = async (id, jwt) => {
  console.log("Retrieving document from mongodb: ", id);
  const response = await fetch(
    `${process.env.REACT_APP_BASE_URL_DEV}api/v1/docs/${id}`,
    {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    }
  );

  return response.json();
};

export const saveQuestionToMongo = async (question, jwt) => {
  console.log("Saving new question to mongodb");
  const response = await fetch(
    `${process.env.REACT_APP_BASE_URL_DEV}api/v1/docs/add`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify(question),
    }
  );

  return response.json();
};

export const deleteQuestionFromMongo = async (id, jwt) => {
  console.log("Deleting question from mongodb: ", id);
  const response = await fetch(
    `${process.env.REACT_APP_BASE_URL_DEV}api/v1/docs/delete/${id}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
    }
  );

  return response.json();
};
export const updateQuestionInMongo = async (id, update, jwt) => {
  console.log("Updating question in mongodb: ", id);
  const response = await fetch(
    `${process.env.REACT_APP_BASE_URL_DEV}api/v1/docs/update/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify(update),
    }
  );

  return response.json();
};

export const getUserEmails = async (jwt) => {
  console.log("Getting list of user emails from mongodb");
  const response = await fetch(
    `${process.env.REACT_APP_BASE_URL_DEV}api/v1/users/get-users`,
    {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    }
  );

  return response.json();
};

export const getFuzzyResults = async (searchValue, jwt) => {
  console.log("Getting fuzzy search results from mongodb");
  const response = await fetch(
    `${process.env.REACT_APP_BASE_URL_DEV}api/v1/docs/fuzzysearch`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify({ searchValue: searchValue }),
    }
  );

  return response.json();
};

export const getSemanticResults = async (searchValue, jwt) => {
  console.log("Getting semantic search results from mongodb");
  const response = await fetch(
    `${process.env.REACT_APP_BASE_URL_DEV}api/v1/docs/semanticsearch`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify({ searchValue: searchValue }),
    }
  );

  return response.json();
};
