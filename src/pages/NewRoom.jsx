import React from "react";
import NewRoomForm from "../components/newRoom/NewRoomForm";
import { redirect } from "react-router-dom";

const NewRoom = (props) => {
  return (
    <>
      <NewRoomForm />
    </>
  );
};

export default NewRoom;

export const newRoomLoader = async () => {
  const token = localStorage.getItem("token");

  if (!token) {
    return redirect("/login");
  }
  return null;
};
