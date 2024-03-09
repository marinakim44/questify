import React from "react";
import ActionButtons from "./ActionButtons";
import SearchBox from "./SearchBox";

export default function ActionBar() {
  return (
    <div className="bg-slate-700 px-10 h-20 flex flex-row w-full justify-between items-center">
      <SearchBox />
      <ActionButtons />
    </div>
  );
}
