import React, { useState } from "react";
import AddNewCardModal from "./AddNewCardModal";

export default function ActionButtons() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);

  return (
    <div className="w-3/6 flex justify-end">
      <button
        onClick={handleOpen}
        className="p-3 bg-green-500 text-white font-bold rounded w-1/4"
      >
        Add Question
      </button>
      {open && <AddNewCardModal open={open} handleOpen={handleOpen} />}
    </div>
  );
}
