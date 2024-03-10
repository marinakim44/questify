import React from "react";

export default function SearchBar({ searchChange }) {
  return (
    <div className="w-1/2">
      <input
        placeholder="Search questions..."
        className="p-3 w-9/12 rounded"
        onChange={searchChange}
      />
    </div>
  );
}
