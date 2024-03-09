import React from "react";
import ProfileIcon from "./ProfileIcon";

export default function AuthHeader() {
  return (
    <div className="flex flex-row justify-between items-center bg-cyan-200 px-10 h-20">
      <div>
        <h1 className="text-2xl font-bold">Questify</h1>
        <p className="italic">Compliance made easy</p>
      </div>
      <div>
        <ProfileIcon />
      </div>
    </div>
  );
}
