export const getQuestionsFromMongo = async (jwt) => {
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
  console.log("saving new question to mongodb");
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
  console.log("updating question: ", id, " with: ", update);
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
  console.log("getting list of users");
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
