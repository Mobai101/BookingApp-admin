import React from "react";

import DashBoard from "../components/homepage/DashBoard";
import TransactionTable from "../components/homepage/TransactionTable";
import { redirect } from "react-router-dom";

const Home = () => {
  return (
    <>
      <DashBoard />
      <TransactionTable title="LATEST TRANSACTIONS" />
    </>
  );
};

export default Home;

export const homeLoader = async () => {
  const token = localStorage.getItem("token");

  if (!token) {
    return redirect("/login");
  }

  // prettier-ignore
  const myHeaders = new Headers({ "Authorization": token, "Content-Type": "application/json"});

  try {
    const response = await fetch("http://localhost:5000/admin", {
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
