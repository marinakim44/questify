import React, { useState, useEffect } from "react";
import AuthHeader from "./components/AuthHeader";
import QuestionList from "./components/QuestionList";
import { useSelector, useDispatch } from "react-redux";
import { setQuestions } from "./slices/questionSlice";
import { useNavigate } from "react-router-dom";
import ActionBar from "./components/ActionBar";
import { getQuestionsFromMongo } from "./assets/mongodbCrud";

export default function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const jwt = useSelector((state) => state.user.value.token);
  const [docs, setDocs] = useState([]);

  useEffect(() => {
    getQuestionsFromMongo(jwt)
      .then((res) => {
        setDocs(res);
        dispatch(setQuestions(res));
      })
      .catch((err) => console.log(err));
  }, [jwt, dispatch]);

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
