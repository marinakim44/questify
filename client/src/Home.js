import React, { useEffect, useState } from "react";
import AuthHeader from "./components/AuthHeader";
import QuestionList from "./components/QuestionList";
import { useSelector, useDispatch } from "react-redux";
import { setQuestions } from "./slices/questionSlice";
import { useNavigate } from "react-router-dom";
import {
  getQuestionsFromMongo,
  saveQuestionToMongo,
  deleteQuestionFromMongo,
} from "./assets/mongodbCrud";
import SearchBar from "./components/SearchBar";
import AddNewCardModal from "./components/AddNewCardModal";

export default function Home() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const jwt = useSelector((state) => state.user.value.token);

  const [docs, setDocs] = useState([]);
  const [searchField, setSearchField] = useState("");
  const [newQuestion, setNewQuestion] = useState({
    question: "",
    desc: "",
    answer: "",
    assignedTo: "",
    company: "",
    properties: [],
  });

  useEffect(() => {
    getQuestionsFromMongo(jwt)
      .then((res) => {
        setDocs(res);
        dispatch(setQuestions(res));
      })
      .catch((err) => console.log(err));
  }, []);

  const filteredDocs = docs.filter(
    (doc) =>
      doc.question.toLowerCase().includes(searchField) ||
      doc.answer.toLowerCase().includes(searchField)
  );

  const handleSearch = (e) => {
    setSearchField(e.target.value.toLowerCase());
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewQuestion({ ...newQuestion, [name]: value });
  };

  const handleChangeAssignTo = (e) => {
    setNewQuestion({ ...newQuestion, assignedTo: e.label });
  };

  const handleChangeCompanyName = (e) => {
    setNewQuestion({ ...newQuestion, company: e.label });
  };

  const handleChangeProperties = (e) => {
    setNewQuestion({
      ...newQuestion,
      properties: e.map((x) => {
        return {
          key: x.label,
          value: x.label,
        };
      }),
    });
  };

  const saveQuestion = async () => {
    const saved = await saveQuestionToMongo(newQuestion, jwt);
    console.log("saved new question with ID: ", saved._id);
    setNewQuestion({});
    handleOpen();
    getQuestionsFromMongo(jwt)
      .then((res) => {
        setDocs(res);
        dispatch(setQuestions(res));
        alert("Question added successfully");
      })
      .catch((err) => console.log(err));
  };

  const [checked, setChecked] = useState([]);

  const handleClickCheckbox = (e) => {
    const { id } = e.target;
    if (checked.includes(id)) {
      setChecked(checked.filter((c) => c !== id));
    } else {
      setChecked([...checked, id]);
    }
  };

  const handleDeleteQuestions = async () => {
    checked.forEach(async (id) => {
      await deleteQuestionFromMongo(id, jwt);
      console.log("Deleted document: ", id);
    });

    console.log("Finished deleting documents");
    getQuestionsFromMongo(jwt)
      .then((res) => {
        setDocs(res);
        dispatch(setQuestions(res));
        alert("Questions deleted successfully");
        setChecked([]);
      })
      .catch((err) => console.log(err));
  };

  return jwt ? (
    <div>
      <div className="sticky top-0">
        <AuthHeader />
        <div className="bg-slate-500 flex flex-row justify-between px-10 py-5">
          <SearchBar searchChange={handleSearch} />
          <button
            onClick={handleOpen}
            className="p-3 bg-green-500 text-white font-bold rounded w-1/4"
          >
            Add Question
          </button>
        </div>

        {checked.length > 0 ? (
          <div className="bg-slate-700 px-10 py-3">
            <button
              className="bg-red-500 p-1 rounded text-white"
              onClick={handleDeleteQuestions}
            >
              Delete questions
            </button>
          </div>
        ) : (
          ""
        )}

        <AddNewCardModal
          open={open}
          handleOpen={handleOpen}
          handleClick={saveQuestion}
          handleChange={handleChange}
          handleChangeAssignTo={handleChangeAssignTo}
          handleChangeCompanyName={handleChangeCompanyName}
          handleChangeProperties={handleChangeProperties}
          newQuestion={newQuestion}
        />
      </div>
      <QuestionList
        searchField={searchField}
        questions={filteredDocs}
        handleClickCheckbox={handleClickCheckbox}
        selectedQuestions={checked}
      />
    </div>
  ) : (
    <div>
      <h2>You are not authorized to view this page</h2>
      <button onClick={() => navigate("/")}>Login</button>
    </div>
  );
}
