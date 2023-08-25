import React from "react";
import HotelsTable from "../components/hotels/HotelsTable";
import { redirect } from "react-router-dom";

const Hotels = (props) => {
  return (
    <>
      <HotelsTable />
    </>
  );
};

export default Hotels;

export const hotelsLoader = async () => {
  const token = localStorage.getItem("token");

  if (!token) {
    return redirect("/login");
  }

  // prettier-ignore
  const myHeaders = new Headers({ "Authorization": token, "Content-Type": "application/json"});

  try {
    const response = await fetch("http://localhost:5000/admin/hotels", {
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
