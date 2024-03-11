import { Dialog, DialogBody, DialogFooter } from "@material-tailwind/react";
import Select from "react-select";
import makeAnimated from "react-select/animated";

const animatedComponents = makeAnimated();

export default function Filter({
  open,
  handler,
  apply,
  type,
  list,
  handleChangeFilter,
}) {
  return (
    <Dialog
      open={open}
      handler={handler}
      className="bg-slate-200 z-10 w-1/2 max-w-screen-md min-w-96 mx-auto mt-72 p-10"
    >
      <DialogBody>
        <p>
          Filter by field: <span className="italic">{type}</span>
        </p>
        <Select
          components={animatedComponents}
          id={type}
          placeholder={`Select ${type}`}
          options={list}
          onChange={handleChangeFilter}
        />
      </DialogBody>
      <DialogFooter className="mt-5">
        <button
          onClick={handler}
          className="p-3 bg-pink-500 text-white font-bold rounded w-1/5 mr-5"
        >
          Cancel
        </button>

        <button
          onClick={apply}
          className="p-3 bg-green-500 text-white font-bold rounded w-1/5"
        >
          Apply
        </button>
      </DialogFooter>
    </Dialog>
  );
}
