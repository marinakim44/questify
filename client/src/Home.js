import React, { useState, useEffect, useCallback } from "react";
import AuthHeader from "./components/AuthHeader";
import QuestionList from "./components/QuestionList";

export default function Home() {
  const [docs, setDocs] = useState([]);

  const getData = useCallback(async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL_DEV}api/v1/get-data`
      );
      const data = await response.json();
      setDocs(data);
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <div>
      <AuthHeader />
      <QuestionList questions={docs} />
    </div>
  );
}
