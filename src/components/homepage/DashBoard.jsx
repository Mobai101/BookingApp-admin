import React from "react";
import classes from "./DashBoard.module.css";
import {
  AiOutlineUser,
  AiOutlineShoppingCart,
  AiOutlineDollar,
  AiOutlineWallet,
} from "react-icons/ai";
import { useLoaderData } from "react-router-dom";

const DashBoard = (props) => {
  const loaderData = useLoaderData();

  return (
    <section className={classes.dashboard}>
      <div className={classes.dashboard_card}>
        <h5>USERS</h5>
        <h2>{loaderData.userNo}</h2>
        <div className={`${classes.icon} ${classes.icon_user}`}>
          <AiOutlineUser />
        </div>
      </div>
      <div className={classes.dashboard_card}>
        <h5>ORDERS</h5>
        <h2>{loaderData.allTransactions.length}</h2>
        <div className={`${classes.icon} ${classes.icon_cart}`}>
          <AiOutlineShoppingCart />
        </div>
      </div>
      <div className={classes.dashboard_card}>
        <h5>EARNINGS</h5>
        <h2>$ {loaderData.allEarning}</h2>
        <div className={`${classes.icon} ${classes.icon_dollar}`}>
          <AiOutlineDollar />
        </div>
      </div>
      <div className={classes.dashboard_card}>
        <h5>EARNING/12 MONTH</h5>
        <h2>$ {loaderData.allEarning / 12}</h2>
        <div className={`${classes.icon} ${classes.icon_wallet}`}>
          <AiOutlineWallet />
        </div>
      </div>
    </section>
  );
};

export default DashBoard;
