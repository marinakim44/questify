import {
  Dialog,
  DialogBody,
  DialogFooter,
  Card,
} from "@material-tailwind/react";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";
import makeAnimated from "react-select/animated";
import { useWindowDimensions } from "../assets/customHooks";

const animatedComponents = makeAnimated();

export default function AddNewCardModal({
  open,
  handleOpen,
  handleClick,
  handleUpdate,
  handleChangeTextarea,
  textAreaRef,
  users,
  handleChangeAssignTo,
  handleChangeCompanyName,
  handleChangeProperties,
  newQuestion,
  openedQuestion,
  companies,
  properties,
  setNewTag,
  newTag,
  addTag,
  tag,
  updateTag,
}) {
  const { width } = useWindowDimensions();

  return (
    <Dialog
      open={open}
      handler={handleOpen}
      className={`bg-slate-200 z-10 ${
        width < 500 ? "w-10/12" : "w-1/2"
      } max-w-screen-md min-w-96 mx-auto mt-72 p-10`}
    >
      <h2 className="text-center font-bold text-lg mb-5">
        {openedQuestion ? "Update a question" : "Add a new question"}
      </h2>
      <DialogBody>
        <Card color="transparent" shadow={false}>
          <form className="mt-8 mb-2 w-full">
            <div className="mb-1 flex flex-col gap-5">
              <div className="flex flex-col">
                {openedQuestion && (
                  <label
                    htmlFor="question"
                    className="text-left italic m-o p-0"
                  >
                    Question
                  </label>
                )}
                <textarea
                  id="question"
                  onChange={handleChangeTextarea}
                  placeholder="Specify a question"
                  // ref={textAreaRef}
                  rows={1}
                  value={
                    openedQuestion
                      ? openedQuestion["question"]
                      : newQuestion["question"]
                  }
                  name="question"
                  className="px-3 py-2 !border-t-blue-gray-200 focus:!border-t-gray-900"
                />
              </div>
              <div className="flex flex-col">
                {openedQuestion && (
                  <label
                    htmlFor="questionDesc"
                    className="text-left italic m-o p-0"
                  >
                    Question description
                  </label>
                )}
                <textarea
                  id="questionDesc"
                  onChange={handleChangeTextarea}
                  placeholder="Question description"
                  // ref={textAreaRef}
                  rows={1}
                  value={
                    openedQuestion
                      ? openedQuestion["questionDesc"]
                      : newQuestion["questionDesc"]
                  }
                  name="questionDesc"
                  className="px-3 py-2 !border-t-blue-gray-200 focus:!border-t-gray-900"
                />
              </div>
              <div className="flex flex-col">
                {openedQuestion && (
                  <label htmlFor="answer" className="text-left italic m-o p-0">
                    Answer
                  </label>
                )}
                <textarea
                  id="answer"
                  onChange={handleChangeTextarea}
                  placeholder="Answer"
                  ref={textAreaRef}
                  rows={1}
                  value={
                    openedQuestion
                      ? openedQuestion["answer"]
                      : newQuestion["answer"]
                  }
                  name="answer"
                  className="px-3 py-2 !border-t-blue-gray-200 focus:!border-t-gray-900"
                />
              </div>
              <div className="flex flex-col">
                {openedQuestion && (
                  <label
                    htmlFor="assignto"
                    className="text-left italic m-o p-0"
                  >
                    Assign to
                  </label>
                )}
                <Select
                  components={animatedComponents}
                  isClearable
                  id="assignto"
                  placeholder="Assign to"
                  value={
                    openedQuestion?.assignedTo
                      ? {
                          label: openedQuestion.assignedTo,
                          value: openedQuestion.assignedTo,
                        }
                      : newQuestion?.assignedTo
                      ? {
                          label: newQuestion.assignedTo,
                          value: newQuestion.assignedTo,
                        }
                      : null
                  }
                  options={users
                    .filter((x) => openedQuestion?.assignedTo !== x)
                    .map((u) => {
                      return { label: u, value: u };
                    })}
                  onChange={handleChangeAssignTo}
                />
              </div>

              <div className="flex flex-col">
                {openedQuestion && (
                  <label
                    htmlFor="companyname"
                    className="text-left italic m-o p-0"
                  >
                    Company name
                  </label>
                )}
                <CreatableSelect
                  placeholder="Company name"
                  id="companyname"
                  isClearable
                  value={
                    openedQuestion?.companyName
                      ? {
                          label: openedQuestion.companyName,
                          value: openedQuestion.companyName,
                        }
                      : newQuestion?.company
                      ? {
                          label: newQuestion.company,
                          value: newQuestion.company,
                        }
                      : null
                  }
                  options={companies
                    .filter((x) => openedQuestion?.company !== x)
                    .map((u) => {
                      return { label: u, value: u };
                    })}
                  onChange={handleChangeCompanyName}
                />
              </div>
              <div className="flex flex-col">
                {openedQuestion && (
                  <label
                    htmlFor="properties"
                    className="text-left italic m-o p-0"
                  >
                    Properties
                  </label>
                )}
                <Select
                  placeholder="Properties"
                  id="properties"
                  isMulti
                  isClearable
                  value={
                    openedQuestion?.properties?.length
                      ? openedQuestion.properties[0].split(",").map((p) => {
                          return { label: p, value: p };
                        })
                      : newQuestion?.properties?.length
                      ? newQuestion.properties[0].split(",").map((p) => {
                          return { label: p, value: p };
                        })
                      : null
                  }
                  name="properties"
                  options={properties}
                  className="basic-multi-select"
                  classNamePrefix="select"
                  onChange={handleChangeProperties}
                />
              </div>

              {newTag ? (
                <div className="flex flex-col">
                  <div className="flex flex-col items-left">
                    <input
                      placeholder="key"
                      className="p-2 rounded"
                      name="key"
                      value={tag?.key || ""}
                      onChange={updateTag}
                    />
                    <p className="font-bold mx-2">:</p>
                    <input
                      placeholder="value"
                      className="p-2 rounded"
                      name="value"
                      value={tag?.value || ""}
                      onChange={updateTag}
                    />
                  </div>

                  <div>
                    <button
                      className="text-left underline italic text-green-500 mr-5 mt-2"
                      onClick={(e) => {
                        e.preventDefault();
                        addTag();
                      }}
                    >
                      Add tag
                    </button>
                    <button
                      className="text-left underline italic text-slate-500 m-0 p-0"
                      onClick={(e) => {
                        e.preventDefault();
                        setNewTag(false);
                      }}
                    >
                      Dismiss
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  className="text-left underline italic text-slate-500 m-0 p-0"
                  onClick={(e) => {
                    e.preventDefault();
                    setNewTag(true);
                  }}
                >
                  Add new property
                </button>
              )}
            </div>
          </form>
        </Card>
      </DialogBody>
      <DialogFooter
        className={`${
          width > 500 ? "mt-10" : "flex flex-row justify-between"
        } `}
      >
        <button
          onClick={handleOpen}
          className={`p-3 bg-slate-500 text-white font-bold rounded mr-5`}
        >
          Cancel
        </button>
        <button
          onClick={
            openedQuestion
              ? () => handleUpdate(openedQuestion._id)
              : handleClick
          }
          className="p-3 bg-green-500 text-white font-bold rounded"
        >
          Save
        </button>
      </DialogFooter>
    </Dialog>
  );
}
