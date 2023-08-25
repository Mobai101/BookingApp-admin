import React from "react";
import { redirect } from "react-router-dom";
import NewRoomForm from "../components/newRoom/NewRoomForm";

const EditRoom = (props) => {
  return (
    <>
      <NewRoomForm />
    </>
  );
};

export default EditRoom;

export const editRoomLoader = async ({ params }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return redirect("/login");
  }

  // prettier-ignore
  const myHeaders = new Headers({ "Authorization": token, "Content-Type": "application/json"});

  try {
    const response = await fetch(
      `http://localhost:5000/admin/rooms/edit/${params.roomId}`,
      {
        headers: myHeaders,
      }
    );
    if (!response.ok) {
      throw new Error("Could not fetch data");
    }
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
};
