import React from "react";
import NewHotelForm from "../components/newHotel/NewHotelForm";
import { redirect } from "react-router-dom";

const EditHotel = (props) => {
  return (
    <>
      <NewHotelForm />
    </>
  );
};

export default EditHotel;

export const editHotelLoader = async ({ params }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return redirect("/login");
  }

  // prettier-ignore
  const myHeaders = new Headers({ "Authorization": token, "Content-Type": "application/json"});

  try {
    const response = await fetch(
      `http://localhost:5000/admin/hotels/edit/${params.hotelId}`,
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
