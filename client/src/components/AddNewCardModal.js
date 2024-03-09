import { Dialog, DialogBody, DialogFooter } from "@material-tailwind/react";
import AddNewCardForm from "./AddNewCardForm";
import { useState } from "react";
import { saveQuestionToMongo } from "../assets/mongodbCrud";
import { useSelector, useDispatch } from "react-redux";
import { addQuestion } from "../slices/questionSlice";

export default function AddNewCardModal({ open, handleOpen, add }) {
  const dispatch = useDispatch();
  const [newQuestion, setNewQuestion] = useState({
    question: "",
    desc: "",
    answer: "",
    assignedTo: "",
    company: "",
    properties: [],
  });

  const jwt = useSelector((state) => state.user.value.token);

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
    console.log("Saving question...");
    const saved = await saveQuestionToMongo(newQuestion, jwt);
    console.log("saved new question with ID: ", saved._id);
    handleOpen();
    setNewQuestion({});
    dispatch(addQuestion(saved));
  };

  return (
    <Dialog
      open={open}
      handler={handleOpen}
      className="bg-slate-200 z-10 w-1/2 max-w-screen-md min-w-96 mx-auto mt-72 p-10"
    >
      <h2 className="text-center font-bold text-lg mb-5">Add a new question</h2>
      <DialogBody>
        <AddNewCardForm
          newQuestion={newQuestion}
          handleChange={handleChange}
          handleChangeAssignTo={handleChangeAssignTo}
          handleChangeCompanyName={handleChangeCompanyName}
          handleChangeProperties={handleChangeProperties}
        />
      </DialogBody>
      <DialogFooter className="mt-10">
        <button
          onClick={handleOpen}
          className="p-3 bg-pink-500 text-white font-bold rounded w-1/5 mr-5"
        >
          Cancel
        </button>
        <button
          onClick={saveQuestion}
          className="p-3 bg-green-500 text-white font-bold rounded w-1/5"
        >
          Save
        </button>
      </DialogFooter>
    </Dialog>
  );
}
