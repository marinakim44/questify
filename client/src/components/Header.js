import React from "react";
import { useSelector } from "react-redux";
import ProfileIcon from "./ProfileIcon";

export default function Header() {
  const jwt = useSelector((state) => state.user.value.token);

  return (
    <div className="flex flex-row justify-between items-center bg-slate-700 px-10 h-20 top-0">
      <div>
        <h1 className="text-2xl font-bold text-white">Questify</h1>
        <p className="italic text-white">Compliance made easy</p>
      </div>
      {jwt && (
        <div>
          <ProfileIcon />
        </div>
      )}
    </div>
  );
}
