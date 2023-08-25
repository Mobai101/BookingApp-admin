import React from "react";
import TransactionTable from "../components/homepage/TransactionTable";
import { redirect } from "react-router-dom";

const Transactions = (props) => {
  return (
    <>
      <TransactionTable title="TRANSACTIONS LIST" />
    </>
  );
};

export default Transactions;

export const transactionsLoader = async () => {
  const token = localStorage.getItem("token");

  if (!token) {
    return redirect("/login");
  }

  // prettier-ignore
  const myHeaders = new Headers({ "Authorization": token, "Content-Type": "application/json"});

  try {
    const response = await fetch("http://localhost:5000/admin/transactions", {
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
