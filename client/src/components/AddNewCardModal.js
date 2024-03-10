import {
  Dialog,
  DialogBody,
  DialogFooter,
  Card,
  Input,
} from "@material-tailwind/react";
import Select from "react-select";
import makeAnimated from "react-select/animated";

const textFields = [
  {
    label: "question",
    name: "question",
  },
  {
    label: "question description",
    name: "desc",
  },
  {
    label: "answer",
    name: "answer",
  },
];

const tags = [
  {
    key: "key 1",
    value: "value 1",
    label: "key1: value1",
  },
  {
    key: "key 2",
    value: "value 2",
    label: "key2: value2",
  },
  {
    key: "key 3",
    value: "value 3",
    label: "key3: value3",
  },
];

const animatedComponents = makeAnimated();

export default function AddNewCardModal({
  open,
  handleOpen,
  handleClick,
  handleChange,
  handleChangeAssignTo,
  handleChangeCompanyName,
  handleChangeProperties,
  newQuestion,
}) {
  return (
    <Dialog
      open={open}
      handler={handleOpen}
      className="bg-slate-200 z-10 w-1/2 max-w-screen-md min-w-96 mx-auto mt-72 p-10"
    >
      <h2 className="text-center font-bold text-lg mb-5">Add a new question</h2>
      <DialogBody>
        <Card color="transparent" shadow={false}>
          <form className="mt-8 mb-2 w-full">
            <div className="mb-1 flex flex-col gap-6">
              {textFields.map((field, i) => (
                <Input
                  key={i}
                  size="lg"
                  placeholder={field.label}
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                  name={field.name}
                  value={newQuestion[field.name]}
                  onChange={handleChange}
                />
              ))}

              <Select
                defaultValue={"value 1"}
                components={animatedComponents}
                placeholder="assign to"
                options={[
                  { label: "User 1" },
                  { label: "User 2" },
                  { label: "User 3" },
                ]}
                onChange={handleChangeAssignTo}
              />

              <Select
                defaultValue={"value 1"}
                placeholder="company name"
                options={[
                  { label: "Company 1" },
                  { label: "Company 2" },
                  { label: "Company 3" },
                ]}
                onChange={handleChangeCompanyName}
              />
              <Select
                placeholder="properties"
                isMulti
                name="properties"
                options={tags}
                className="basic-multi-select"
                classNamePrefix="select"
                onChange={handleChangeProperties}
              />
            </div>
          </form>
        </Card>
      </DialogBody>
      <DialogFooter className="mt-10">
        <button
          onClick={handleOpen}
          className="p-3 bg-pink-500 text-white font-bold rounded w-1/5 mr-5"
        >
          Cancel
        </button>
        <button
          onClick={handleClick}
          className="p-3 bg-green-500 text-white font-bold rounded w-1/5"
        >
          Save
        </button>
      </DialogFooter>
    </Dialog>
  );
}
