import React, { useState, useEffect } from "react";
import AuthHeader from "./components/AuthHeader";
import QuestionList from "./components/QuestionList";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ActionBar from "./components/ActionBar";

export default function Home() {
  const navigate = useNavigate();
  const jwt = useSelector((state) => state.user.value.token);
  const [docs, setDocs] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BASE_URL_DEV}api/v1/docs`,
          {
            headers: {
              Authorization: `Bearer ${jwt}`,
            },
          }
        );
        const data = await response.json();
        setDocs(data);
      } catch (err) {
        console.log(err);
      }
    };

    getData();
  }, [jwt]);

  return jwt ? (
    <div>
      <div className="sticky top-0">
        <AuthHeader />
        <ActionBar />
      </div>
      <QuestionList questions={docs} />
    </div>
  ) : (
    <div>
      <h2>You are not authorized to view this page</h2>
      <button onClick={() => navigate("/")}>Login</button>
    </div>
  );
}
