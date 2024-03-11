import { Dialog, DialogBody, DialogFooter } from "@material-tailwind/react";
import CreatableSelect from "react-select/creatable";

export default function DialogAction({
  openAssign,
  handleOpenAssign,
  dialogType,
  users,
  setBulkAssignTo,
  handleBulkAssign,
  bulkAssignTo,
  docs,
  checked,
}) {
  return (
    <Dialog
      open={openAssign}
      handler={handleOpenAssign}
      className="bg-slate-200 z-10 w-1/2 max-w-screen-md min-w-96 mx-auto mt-72 p-10"
    >
      <DialogBody>
        <p className="italic mb-3">
          {`All checked questions will be ${
            dialogType === "assign" ? "assigned" : "delegated (via email)"
          } to the selected person`}
        </p>
        <CreatableSelect
          placeholder={dialogType === "assign" ? "Assign to" : "Delegate to"}
          options={users.map((u) => {
            return { label: u, value: u };
          })}
          onChange={(e) => setBulkAssignTo(e.label)}
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
  );
}
