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
