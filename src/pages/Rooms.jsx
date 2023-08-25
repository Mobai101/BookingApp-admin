import React from "react";
import RoomsTable from "../components/rooms/RoomsTable";
import { redirect } from "react-router-dom";

const Rooms = (props) => {
  return (
    <>
      <RoomsTable />
    </>
  );
};

export default Rooms;

export const roomsLoader = async () => {
  const token = localStorage.getItem("token");

  if (!token) {
    return redirect("/login");
  }

  // prettier-ignore
  const myHeaders = new Headers({ "Authorization": token, "Content-Type": "application/json"});

  try {
    const response = await fetch("http://localhost:5000/admin/rooms", {
      headers: myHeaders,
    });
    if (!response.ok) {
      throw new Error("Could not fetch data");
    }
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
};
