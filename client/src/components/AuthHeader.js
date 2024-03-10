import React from "react";
import ProfileIcon from "./ProfileIcon";

export default function AuthHeader() {
  return (
    <div className="flex flex-row justify-between items-center bg-slate-700 px-10 h-20">
      <div>
        <h1 className="text-2xl font-bold text-white">Questify</h1>
        <p className="italic text-white">Compliance made easy</p>
      </div>
      <div>
        <ProfileIcon />
      </div>
    </div>
  );
}
