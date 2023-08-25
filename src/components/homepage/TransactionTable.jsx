import React from "react";
import classes from "./TransactionTable.module.css";
import { useLoaderData } from "react-router-dom";

const TransactionTable = (props) => {
  const allTransactions = useLoaderData().allTransactions;

  return (
    <div className={classes.transactionSection}>
      <h2>{props.title}</h2>
      <table className={classes.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>User</th>
            <th>Hotel</th>
            <th>Room</th>
            <th>Date</th>
            <th>Price</th>
            <th>Payment</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {allTransactions?.map((transaction) => {
            return (
              <tr key={transaction._id}>
                <td>{transaction._id}</td>
                <td>{transaction.user.username}</td>
                <td>{transaction.hotel.name}</td>
                <td>{transaction.roomNo.join(", ")}</td>
                <td>{`${new Date(transaction.dateStart).toLocaleDateString(
                  "en-GB"
                )} - ${new Date(transaction.dateEnd).toLocaleDateString(
                  "en-GB"
                )}`}</td>
                <td>{`$${transaction.price}`}</td>
                <td>{transaction.payment}</td>
                <td>
                  <span className={classes[transaction.status]}>
                    {transaction.status}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionTable;
