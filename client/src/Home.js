import React, { useEffect, useState, useRef } from "react";
import AuthHeader from "./components/AuthHeader";
import QuestionList from "./components/QuestionList";
import { useSelector, useDispatch } from "react-redux";
import { addQuestion, setQuestions } from "./slices/questionSlice";
import { useNavigate } from "react-router-dom";
import {
  getQuestionsFromMongo,
  saveQuestionToMongo,
  deleteQuestionFromMongo,
  updateQuestionInMongo,
  getFuzzyResults,
} from "./assets/mongodbCrud";
import SearchBar from "./components/SearchBar";
import AddNewCardModal from "./components/AddNewCardModal";
import { removeDups } from "./assets/dataOperations";
import { getUserEmails, getSemanticResults } from "./assets/mongodbCrud";
import { getSearchResults } from "./assets/searchEngine";
import { useAutosizeTextarea } from "./assets/customHooks";
import { Radio } from "@material-tailwind/react";
import AddIcon from "@mui/icons-material/Add";
import Filter from "./components/Filter";
import Header from "./components/Header";
import CustomToast from "./components/CustomToast";
import { searchTypes } from "./assets/data";
import DialogAction from "./components/DialogAction";

export default function Home() {
  const textAreaRef = useRef(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [openAssign, setOpenAssign] = useState(false);

  const [dialogType, setDialogType] = useState();
  const [newTag, setNewTag] = useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };

  const handleOpenAssign = (type) => {
    if (type === "assign") {
      setDialogType("assign");
    } else if (type === "delegate") {
      setDialogType("delegate");
    }
    setOpenAssign(!openAssign);
  };

  const jwt = useSelector((state) => state.user.value.token);
  const currentUserEmail = useSelector(
    (state) => state.user.value.payload?.email
  );

  const initialStateDocs = useSelector((state) => state.question.value);

  const [docs, setDocs] = useState([]);
  const [users, setUsers] = useState([]);
  const [searchField, setSearchField] = useState("");
  const [newQuestion, setNewQuestion] = useState({
    question: "",
    questionDesc: "",
    answer: "",
    assignedTo: "",
    company: "",
    properties: [],
  });
  const [openedQuestion, setOpenedQuestion] = useState();

  const [isToastOpen, setIsToastOpen] = useState(false);
  const [action, setAction] = useState("add");
  const [checked, setChecked] = useState([]);
  const [bulkAssignTo, setBulkAssignTo] = useState("");
  const [tag, setTag] = useState({
    key: "",
    value: "",
  });
  const [searchType, setSearchType] = useState("simple");

  useEffect(() => {
    getQuestionsFromMongo(jwt)
      .then((res) => {
        setDocs(res);
        dispatch(setQuestions(res));
      })
      .catch((err) => console.log(err));

    getUserEmails(jwt)
      .then((res) => {
        setUsers(res.map((u) => u.email));
      })
      .catch((err) => console.log(err));
  }, []);

  useAutosizeTextarea(
    textAreaRef.current,
    openedQuestion ? openedQuestion.answer : newQuestion.answer
  );

  const handleSearch = (e) => {
    setSearchField(e.target.value.toLowerCase());
  };

  const handleChangeTextarea = (e) => {
    const { name, value } = e.target;
    if (openedQuestion) {
      setOpenedQuestion((prevQuestion) => ({ ...prevQuestion, [name]: value }));
    } else {
      setNewQuestion((prevQuestion) => ({ ...prevQuestion, [name]: value }));
    }
  };

  const handleChangeAssignTo = (e) => {
    openedQuestion
      ? setOpenedQuestion({ ...openedQuestion, assignedTo: e?.label || "" })
      : setNewQuestion({ ...newQuestion, assignedTo: e?.label || "" });
  };

  const handleChangeCompanyName = (e) => {
    openedQuestion
      ? setOpenedQuestion({ ...openedQuestion, companyName: e?.label || "" })
      : setNewQuestion({ ...newQuestion, company: e?.label || "" });
  };

  const handleChangeProperties = (e) => {
    openedQuestion
      ? setOpenedQuestion({
          ...openedQuestion,
          properties: [e.map((x) => x.label).join()],
        })
      : setNewQuestion({
          ...newQuestion,
          properties: [e.map((x) => x.label).join()],
        });
  };

  const saveQuestion = async () => {
    if (!newQuestion || !newQuestion?.question) {
      alert("Please specify a question");
    }
    setDocs(
      docs.concat(
        Object.assign({}, newQuestion, {
          createdBy: currentUserEmail,
          createdAt: new Date(),
        })
      )
    );
    dispatch(addQuestion(newQuestion));

    await saveQuestionToMongo(newQuestion, jwt);

    setNewQuestion({});
    handleOpen();
    setIsToastOpen(true);
  };

  const updateQuestion = async (id) => {
    if (openedQuestion && !openedQuestion.question) {
      alert("Please soecify a question");
    } else {
      setDocs(
        docs.map((d) =>
          d._id === id
            ? Object.assign({}, openedQuestion, {
                updatedBy: currentUserEmail,
                updatedAt: new Date(),
              })
            : d
        )
      );
      dispatch(
        setQuestions(
          docs.map((d) =>
            d._id === id
              ? Object.assign({}, openedQuestion, {
                  updatedBy: currentUserEmail,
                  updatedAt: new Date(),
                })
              : d
          )
        )
      );

      await updateQuestionInMongo(id, openedQuestion, jwt);

      setOpenedQuestion();
      handleOpen();
    }
  };

  const handleClickCheckbox = (e) => {
    const { id } = e.target;
    if (checked.includes(id)) {
      setChecked(checked.filter((c) => c !== id));
    } else {
      setChecked([...checked, id]);
    }
  };

  const handleDeleteQuestions = async () => {
    setDocs(docs.filter((d) => !checked.includes(d._id)));
    dispatch(setQuestions(docs.filter((d) => !checked.includes(d._id))));

    await Promise.all(
      checked.map(async (id) => {
        await deleteQuestionFromMongo(id, jwt);
        console.log("Deleted document: ", id);
      })
    );

    console.log("Finished deleting documents");

    setSearchField("");
    setAction("delete");
    setChecked([]);
    setIsToastOpen(true);
  };

  const handleOpenQuestion = (id) => {
    setOpenedQuestion(docs.find((q) => q._id === id));
    handleOpen();
  };

  const handleBulkAssign = async () => {
    setDocs(
      docs.map((d) =>
        checked.includes(d._id) ? { ...d, assignedTo: bulkAssignTo } : d
      )
    );
    dispatch(
      setQuestions(
        docs.map((d) =>
          checked.includes(d._id) ? { ...d, assignedTo: bulkAssignTo } : d
        )
      )
    );

    await Promise.all(
      checked.map(async (id) => {
        await updateQuestionInMongo(
          id,
          dialogType === "assign"
            ? { assignedTo: bulkAssignTo }
            : { delegatedTo: bulkAssignTo },
          jwt
        );
        console.log("Updated document: ", id);
      })
    );

    console.log("Finished updating documents");

    handleOpenAssign();
    setChecked([]);

    if (dialogType === "assign") {
      setAction("update");
      setIsToastOpen(true);
    }
  };

  const handleBulkDelegate = async () => {
    handleOpenAssign();
    setChecked([]);
  };

  const handleGetLogs = async (id) => {
    console.log("Getting logs for question: ", id);

    alert(
      JSON.stringify(
        Object.entries(docs.filter((d) => d._id === id)?.[0]).filter((e) =>
          ["createdBy", "createdAt", "updatedBy", "updatedAt"].includes(e?.[0])
        )
      )
    );
  };

  const updateTag = (e) => {
    setTag({ ...tag, [e.target.name]: e.target.value });
  };

  const addTag = () => {
    let newTagToAdd = `${tag.key}:${tag.value}`;
    let existingTags = openedQuestion?.properties
      ? openedQuestion.properties?.[0]
      : newQuestion?.properties?.[0];
    let newTagsList = existingTags
      ? existingTags + `,${newTagToAdd}`
      : newTagToAdd;

    openedQuestion
      ? setOpenedQuestion({ ...openedQuestion, properties: [newTagsList] })
      : setNewQuestion({ ...newQuestion, properties: [newTagsList] });

    setTag({ key: "", value: "" });
    setNewTag(false);
  };

  // FILTERS
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isFilterApplied, setIsFilterApplied] = useState(false);
  const [filterType, setFilterType] = useState("");
  const [filterField, setFilterField] = useState();

  const handleFilter = (type) => {
    setFilterType(type);
    setIsFilterOpen(!isFilterOpen);
  };
  const applyFilter = () => {
    setIsFilterApplied(true);
    if (filterType === "assignedTo") {
      setDocs(docs.filter((d) => filterField === d.assignedTo));
    } else if (filterType === "properties") {
      setDocs(
        docs.filter(
          (d) =>
            d.properties?.[0]?.includes(filterField) ||
            d.properties?.includes(filterField)
        )
      );
    }

    handleFilter();
  };

  const handleChangeFilter = (e) => {
    setFilterField(e.label);
  };

  const resetFilter = async () => {
    setDocs(initialStateDocs);
    setIsFilterOpen(false);
    setIsFilterApplied(false);
  };

  const getSimpleSearchResults = () => {
    setDocs(docs.filter((d) => d.question.includes(searchField)));
  };

  const getSemanticSearchResults = async () => {
    const res = await getSemanticResults(searchField, jwt);
    setDocs(res);
  };

  const getFuzzySearchResults = async () => {
    const res = getSearchResults(docs, searchField);
    setDocs(res.map((r) => r.item));
  };

  const getFuzzyServerSearchResults = async () => {
    const res = await getFuzzyResults(searchField, jwt);
    setDocs(res);
  };

  const handleSearchMain = () => {
    searchType === "simple"
      ? getSimpleSearchResults()
      : searchType === "fuzzy-client"
      ? getFuzzySearchResults()
      : searchType === "fuzzy-server"
      ? getFuzzyServerSearchResults()
      : getSemanticSearchResults();
  };

  const resetResults = () => {
    setSearchField("");
    setDocs(initialStateDocs);
  };

  const refresh = async () => {
    getQuestionsFromMongo(jwt)
      .then((res) => {
        setDocs(res);
        dispatch(setQuestions(res));
        setChecked([]);
        setSearchField("");
      })
      .catch((err) => console.log(err));
  };

  return jwt ? (
    <div>
      {isToastOpen && (
        <CustomToast action={action} close={() => setIsToastOpen(false)} />
      )}

      <div className="sticky top-0">
        <AuthHeader />
        <div className="bg-slate-500 flex flex-row justify-between px-10 py-5 items-center">
          <div>
            <SearchBar
              searchChange={handleSearch}
              searchValue={searchField}
              clear={resetResults}
              handleSearch={handleSearchMain}
            />
            <div className="flex gap-3">
              {searchTypes.map((t, i) => {
                return (
                  <div
                    key={i}
                    className="text-center flex flex-col items-center"
                  >
                    <Radio
                      onChange={() => setSearchType(t.name)}
                      checked={searchType === t.name}
                    />
                    <p className="text-slate-300 text-sm">{t.label}</p>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="flex flex-row justify-end ml-3">
            <button
              onClick={handleOpen}
              className="p-3 bg-green-500 text-white font-bold rounded flex flex-row items-center justify-center"
            >
              <AddIcon />
              <p>Add Question</p>
            </button>
          </div>
        </div>

        {checked.length > 0 ? (
          <div className="bg-slate-700 px-10 py-3 flex flex-row">
            <button
              className="bg-cyan-500 p-1 mr-1 rounded text-white"
              onClick={() => handleOpenAssign("assign")}
            >
              Assign
            </button>
            <button
              className="bg-teal-500 p-1 mr-1 rounded text-white"
              onClick={() => handleOpenAssign("delegate")}
            >
              Delegate
            </button>
            <button
              className="bg-red-500 p-1 rounded text-white"
              onClick={handleDeleteQuestions}
            >
              Delete
            </button>
          </div>
        ) : (
          ""
        )}

        <div className="flex flex-row h-14 items-center justify-between bg-white">
          <div className="flex flex-row">
            <h2 className="ml-10 mr-1 italic">
              <span className="font-bold">{docs.length} questions </span>|{" "}
              <span
                className="underline hover:cursor-pointer text-slate-500"
                onClick={refresh}
              >
                Refresh
              </span>
            </h2>

            {checked.length > 0 ? (
              <div className="flex flex-row">
                <h2 className="italic font-bold">
                  {`| ${checked.length} selected |`}&nbsp;
                </h2>
                <button onClick={() => setChecked([])}>
                  <h2 className="italic underline text-slate-500">Cancel</h2>
                </button>
              </div>
            ) : (
              ""
            )}
          </div>
          <div>
            {isFilterApplied ? (
              <button onClick={resetFilter}>
                <h2 className="italic underline text-slate-500 mr-10">
                  Reset filters
                </h2>
              </button>
            ) : (
              ""
            )}
          </div>
        </div>

        <DialogAction
          openAssign={openAssign}
          handleOpenAssign={handleOpenAssign}
          dialogType={dialogType}
          users={users}
          setBulkAssignTo={setBulkAssignTo}
          handleBulkAssign={handleBulkAssign}
          handleBulkDelegate={handleBulkDelegate}
          bulkAssignTo={bulkAssignTo}
          docs={docs}
          checked={checked}
        />

        <Filter
          open={isFilterOpen}
          handler={handleFilter}
          apply={applyFilter}
          type={filterType}
          handleChangeFilter={handleChangeFilter}
          resetFilter={resetFilter}
          list={
            filterType === "assignedTo"
              ? users.map((u) => {
                  return { label: u, value: u };
                })
              : removeDups(
                  docs
                    .map((d) => d.properties?.[0])
                    .join()
                    .split(",")
                ).map((p) => {
                  return { label: p, value: p };
                })
          }
        />

        <AddNewCardModal
          open={open}
          handleOpen={handleOpen}
          handleClick={saveQuestion}
          handleUpdate={updateQuestion}
          handleChangeTextarea={handleChangeTextarea}
          textAreaRef={textAreaRef}
          users={users}
          handleChangeAssignTo={handleChangeAssignTo}
          handleChangeCompanyName={handleChangeCompanyName}
          handleChangeProperties={handleChangeProperties}
          newQuestion={newQuestion}
          openedQuestion={openedQuestion}
          companies={removeDups(docs.map((d) => d.companyName))}
          properties={removeDups(
            docs
              .map((d) => d.properties?.[0])
              .join()
              .split(",")
          ).map((p) => {
            return { label: p, value: p };
          })}
          setNewTag={setNewTag}
          newTag={newTag}
          addTag={addTag}
          tag={tag}
          updateTag={updateTag}
        />
      </div>

      <QuestionList
        searchField={searchField}
        questions={docs}
        handleClickCheckbox={handleClickCheckbox}
        selectedQuestions={checked}
        handleOpenQuestion={handleOpenQuestion}
        handleGetLogs={handleGetLogs}
        handleFilter={handleFilter}
      />
    </div>
  ) : (
    <div>
      <Header />
      <div className="text-center font-bold">
        <h2 className="mt-10">You are not authorized to view this page</h2>
        <button
          className="bg-cyan-500 text-white px-10 py-1 rounded mt-5"
          onClick={() => navigate("/")}
        >
          Login
        </button>
      </div>
    </div>
  );
}
