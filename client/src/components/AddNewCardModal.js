import { Dialog, DialogBody, DialogFooter } from "@material-tailwind/react";
import AddNewCardForm from "./AddNewCardForm";

export default function AddNewCardModal({ open, handleOpen }) {
  return (
    <Dialog
      open={open}
      handler={handleOpen}
      className="bg-slate-200 z-10 w-1/2 mx-auto mt-72 p-10"
    >
      <h2 className="text-center font-bold text-lg mb-5">Add a new question</h2>
      <DialogBody>
        <AddNewCardForm />
      </DialogBody>
      <DialogFooter className="mt-10">
        <button
          onClick={handleOpen}
          className="p-3 bg-pink-500 text-white font-bold rounded w-1/5 mr-5"
        >
          Cancel
        </button>
        <button
          onClick={handleOpen}
          className="p-3 bg-green-500 text-white font-bold rounded w-1/5"
        >
          Save
        </button>
      </DialogFooter>
    </Dialog>
  );
}
