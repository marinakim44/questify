import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function ProfileIcon() {
  const navigate = useNavigate();
  const { email, picture } = useSelector((state) => state.user.value.payload);

  return (
    <div
      onClick={() => navigate("/profile")}
      className="w-12 h-12 border-pink-500 flex items-center justify-center hover:cursor-pointer"
    >
      {picture ? (
        <img
          src={picture}
          alt="profile"
          className="w-12 h-12 rounded-full object-cover"
        />
      ) : (
        <p className="font-bold">
          {email && email.substring(0, 2).toUpperCase()}
        </p>
      )}
    </div>
  );
}
