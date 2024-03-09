import React from "react";
import { useSelector } from "react-redux";

export default function User() {
  const user = useSelector((state) => state.user.value.payload);

  return (
    <div className="bg-cyan-500">
      <h2>User information</h2>
      <p>{user.name}</p>
      <p>{user.email}</p>
      <button className="bg-pink-500">Logout</button>
    </div>
  );
}
