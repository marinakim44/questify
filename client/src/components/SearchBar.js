// search bar is designed to be intuitive, press Escape to reset the list of questions

export default function SearchBar({
  searchChange,
  searchValue,
  clear,
  handleSearch,
}) {
  return (
    <div>
      <input
        placeholder="Search questions..."
        className="p-3 w-full rounded"
        onChange={searchChange}
        value={searchValue}
        onKeyUp={(e) => {
          if (e.key === "Enter") {
            if (searchValue.length > 0) {
              handleSearch();
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
