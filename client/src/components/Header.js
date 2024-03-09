import React from "react";
import { useSelector } from "react-redux";
import AuthHeader from "./AuthHeader";

export default function Header() {
  const jwt = useSelector((state) => state.user.value.token);

  return jwt ? (
    <AuthHeader />
  ) : (
    <div className="mt-5 text-center">
      <h1 className="text-2xl antialiased hover:subpixel-antialiased">
        Questify
      </h1>
    </div>
  );
}
