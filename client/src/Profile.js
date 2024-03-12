import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Header from "./components/Header";
import { googleLogout } from "@react-oauth/google";
import { useWindowDimensions } from "./assets/customHooks";

export default function Profile() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.value.payload);
  const { width } = useWindowDimensions();

  return (
    <div>
      <Header />
      <div
        className={`bg-slate-300 flex flex-col gap-5 ${
          width < 500 ? "w-10/12" : "w-1/2"
        } m-auto mt-10 p-10 rounded`}
      >
        <h2 className="font-bold">You're logged in as:</h2>
        <p className="italic">Name: {user.name}</p>
        <p className="italic">Email: {user.email}</p>
        <div className="flex flex-row justify-start">
          <button
            className="bg-slate-500 text-white p-2 rounded mr-2"
            onClick={() => {
              googleLogout();
              navigate("/");
            }}
          >
            Logout
          </button>
          <button
            className="bg-green-700 text-white p-2 rounded"
            onClick={() => navigate(-1)}
          >
            Go back
          </button>
        </div>
      </div>
    </div>
  );
}
