import CloseIcon from "@mui/icons-material/Close";

export default function SearchBar({
  searchChange,
  searchValue,
  clear,
  fuzzySearch,
}) {
  return (
    <div className="w-1/2">
      {searchValue.length > 0 ? (
        <CloseIcon
          className="text-slate-200 absolute top-1/2"
          style={{ left: "36%" }}
          onClick={clear}
        />
      ) : (
        ""
      )}
      <input
        placeholder="Search questions..."
        className="p-3 w-9/12 rounded"
        onChange={searchChange}
        value={searchValue}
        onKeyUp={(e) => {
          if (e.key === "Enter") {
            if (searchValue.length > 0) {
              fuzzySearch();
            } else {
              clear();
            }
          } else if (e.key === "Escape") {
            clear();
          }
        }}
      />
    </div>
  );
}
