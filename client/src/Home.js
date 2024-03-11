import React, { useEffect, useState, useRef } from "react";
import AuthHeader from "./components/AuthHeader";
import QuestionList from "./components/QuestionList";
import { useSelector, useDispatch } from "react-redux";
import { setQuestions } from "./slices/questionSlice";
import { useNavigate } from "react-router-dom";
import {
  getQuestionsFromMongo,
  saveQuestionToMongo,
  deleteQuestionFromMongo,
  updateQuestionInMongo,
  getDocumentFromMongo,
} from "./assets/mongodbCrud";
import SearchBar from "./components/SearchBar";
import AddNewCardModal from "./components/AddNewCardModal";
import { removeDups } from "./assets/dataOperations";
import { getUserEmails, getFuzzyResults } from "./assets/mongodbCrud";
import { getSearchResults } from "./assets/searchEngine";
import { useAutosizeTextarea } from "./assets/customHooks";
import CreatableSelect from "react-select/creatable";
import { Dialog, DialogBody, DialogFooter } from "@material-tailwind/react";
import AddIcon from "@mui/icons-material/Add";
import Filter from "./components/Filter";

export default function Home() {
  const textAreaRef = useRef(null);

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

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const jwt = useSelector((state) => state.user.value.token);

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

  const handleSearch = (e) => {
    setSearchField(e.target.value.toLowerCase());
  };

  const handleChangeTextarea = (e) => {
    const { name, value } = e.target;
    if (openedQuestion) {
      setOpenedQuestion({ ...openedQuestion, [name]: value });
    } else {
      setNewQuestion({ ...newQuestion, [name]: value });
    }
  };

  const handleChangeAssignTo = (e) => {
    openedQuestion
      ? setOpenedQuestion({ ...openedQuestion, assignedTo: e.label })
      : setNewQuestion({ ...newQuestion, assignedTo: e.label });
  };

  const handleChangeCompanyName = (e) => {
    console.log("selected company: ", e.label);
    openedQuestion
      ? setOpenedQuestion({ ...openedQuestion, companyName: e.label })
      : setNewQuestion({ ...newQuestion, company: e.label });
  };

  const handleChangeProperties = (e) => {
    console.log("selected properties: ", e);
    console.log("transformed properties: ", e.map((p) => p.label).join());

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

  const updateQuestion = async (id) => {
    console.log("updating question: ", id);
    const res = await updateQuestionInMongo(id, openedQuestion, jwt);
    console.log("response from update in mongodb: ", res);
    setOpenedQuestion();
    handleOpen();
    getQuestionsFromMongo(jwt)
      .then((res) => {
        setDocs(res);
        dispatch(setQuestions(res));
        alert("Question updated successfully");
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

  const [openedQuestion, setOpenedQuestion] = useState();

  const handleClickQuestion = (id) => {
    console.log("clicked question: ", id);
    setOpenedQuestion(docs.find((q) => q._id === id));
    handleOpen();
  };

  useAutosizeTextarea(
    textAreaRef.current,
    openedQuestion ? openedQuestion.question : newQuestion.question
  );

  const [bulkAssignTo, setBulkAssignTo] = useState("");
  const handleChangeBulkAssignTo = (e) => {
    console.log("bulk assign to: ", e.label);
    setBulkAssignTo(e.label);
  };

  const handleBulkAssign = async () => {
    console.log("bulk assign questions: ", checked);
    console.log("to the following person: ", bulkAssignTo);

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

    const res = await getQuestionsFromMongo(jwt);
    console.log("updated documents");
    setDocs(res);
    dispatch(setQuestions(res));
    handleOpenAssign();
    setChecked([]);
    dialogType === "assign" && alert("Questions assigned successfully");
  };

  const handleGetLogs = async (id) => {
    console.log("getting logs for question: ", id);
    const res = await getDocumentFromMongo(id, jwt);

    alert(
      JSON.stringify(
        Object.entries(res).filter((e) =>
          ["createdBy", "createdAt", "updatedBy", "updatedAt"].includes(e[0])
        )
      )
    );
  };

  const [tag, setTag] = useState({
    key: "",
    value: "",
  });

  const updateTag = (e) => {
    setTag({ ...tag, [e.target.name]: e.target.value });
  };

  const addTag = () => {
    let newTagToAdd = `${tag.key}:${tag.value}`;
    let existingTags = openedQuestion?.properties
      ? openedQuestion.properties[0]
      : newQuestion?.properties[0];
    let newTagsList = existingTags
      ? existingTags + `,${newTagToAdd}`
      : newTagToAdd;

    openedQuestion
      ? setOpenedQuestion({ ...openedQuestion, properties: [newTagsList] })
      : setNewQuestion({ ...newQuestion, properties: [newTagsList] });

    setTag({ key: "", value: "" });
    setNewTag(false);
  };

  // filters
  const [filtersApplied, setFiltersApplied] = useState([]);

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filterType, setFilterType] = useState();
  const [filterField, setFilterField] = useState();

  const handleFilter = (type) => {
    setFilterType(type);
    setIsFilterOpen(!isFilterOpen);
  };
  const applyFilter = () => {
    if (filterType === "assignedTo") {
      setDocs(
        docs.filter((d) => filterField.assignedTo.includes(d.assignedTo))
      );
    } else if (filterType === "properties") {
      setDocs(
        docs.filter((d) => filterField.properties.includes(d.properties[0]))
      );
    }

    handleFilter("");
  };

  const handleChangeFilter = (e) => {
    setFilterField({
      ...filterField,
      [filterType]: e.map((x) => x.label),
    });
  };

  const resetFilter = async () => {
    const res = await getQuestionsFromMongo(jwt);

    setDocs(res);
    dispatch(setQuestions(res));
    handleFilter();
    setFiltersApplied([]);
  };

  const getFuzzySearchResults = () => {
    const res = getSearchResults(docs, searchField);
    console.log("search res: ", res);
    // const res = await getFuzzyResults(searchField, jwt);
    // console.log(
    //   "show docs: ",
    //   docs.filter((d) => res.includes(d._id))
    // );

    setDocs(res.map((r) => r.item));
    // dispatch(docs.filter((d) => res.includes(d._id)));
  };

  const resetResults = () => {
    setSearchField("");
    getQuestionsFromMongo(jwt)
      .then((res) => {
        setDocs(res);
        dispatch(setQuestions(res));
      })
      .catch((err) => console.log(err));
  };

  return jwt ? (
    <div>
      <div className="sticky top-0">
        <AuthHeader />
        <div className="bg-slate-500 flex flex-row justify-between px-10 h-24 items-center">
          <SearchBar
            searchChange={handleSearch}
            searchValue={searchField}
            clear={resetResults}
            fuzzySearch={getFuzzySearchResults}
          />

          <div className="w-1/2 flex flex-row justify-end">
            <button
              onClick={handleOpen}
              className="p-3 bg-green-500 text-white font-bold rounded w-1/4 flex flex-row items-center justify-center"
            >
              <AddIcon fontSize="medium" />
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

        <div className="flex flex-row h-14 items-center bg-white">
          <h2 className="ml-10 mr-1 italic font-bold">
            {docs.length} questions
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

        <Dialog
          open={openAssign}
          handler={handleOpenAssign}
          className="bg-slate-200 z-10 w-1/2 max-w-screen-md min-w-96 mx-auto mt-72 p-10"
        >
          <DialogBody>
            <p className="italic mb-3">
              {`All checked questions will be ${
                dialogType === "assign" ? "assigned" : "delegated"
              } to the selected person`}
            </p>
            <CreatableSelect
              placeholder={
                dialogType === "assign" ? "Assign to" : "Delegate to"
              }
              options={users.map((u) => {
                return { label: u, value: u };
              })}
              onChange={handleChangeBulkAssignTo}
            />
          </DialogBody>
          <DialogFooter className="mt-5">
            <button
              onClick={handleOpenAssign}
              className="p-3 bg-pink-500 text-white font-bold rounded w-1/5 mr-5"
            >
              Cancel
            </button>
            {dialogType === "assign" ? (
              <button
                onClick={handleBulkAssign}
                className="p-3 bg-green-500 text-white font-bold rounded w-1/5"
              >
                Assign
              </button>
            ) : (
              <button
                onClick={handleBulkAssign}
                className="p-3 bg-green-500 text-white font-bold rounded w-1/5"
              >
                <a
                  href={`mailto:${bulkAssignTo}?subject=Questify%20Delegated%20Questions&body=Hello,%0D%0A%0D%0APlease%20take%20care%20of%20the%20below%20Questify%20question(s):%0D%0A%0D%0A${JSON.stringify(
                    docs
                      .filter((d) => checked.includes(d._id))
                      .map((d, index) => `${index + 1}. ${d.question}`)
                      .join("%0D%0A")
                  )}%0D%0A%0D%0AThank%20you`}
                  target="_blank"
                  rel="noreferrer"
                >
                  Delegate
                </a>
              </button>
            )}
          </DialogFooter>
        </Dialog>

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
                    .map((d) => d.properties[0])
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
              .map((d) => d.properties[0])
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
        // questions={filterDocuments(docs, searchField)}
        questions={docs}
        handleClickCheckbox={handleClickCheckbox}
        selectedQuestions={checked}
        handleClickQuestion={handleClickQuestion}
        handleGetLogs={handleGetLogs}
        handleFilter={handleFilter}
        filtersApplied={filtersApplied}
      />
    </div>
  ) : (
    <div className="text-center mt-10 font-bold">
      <h2>You are not authorized to view this page</h2>
      <button
        className="bg-cyan-500 text-white px-10 py-1 rounded mt-5"
        onClick={() => navigate("/")}
      >
        Login
      </button>
    </div>
  );
}
