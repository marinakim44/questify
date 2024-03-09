import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.value.payload);

  return (
    <div className="bg-cyan-500">
      <h2>User information</h2>
      <p>{user.name}</p>
      <p>{user.email}</p>
      <button className="bg-pink-500">Logout</button>
      <button className="bg-green-500" onClick={() => navigate(-1)}>
        Go back
      </button>
    </div>
  );
}
