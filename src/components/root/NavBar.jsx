import React from "react";
import classes from "./NavBar.module.css";
import { Link, useLoaderData } from "react-router-dom";
import { BsFillGrid1X2Fill, BsFillBuildingFill } from "react-icons/bs";
import { MdBedroomParent } from "react-icons/md";
import { FaMoneyCheck } from "react-icons/fa";

const NavBar = (props) => {
  const loaderData = useLoaderData();

  const LoggedInNavs = () => {
    return (
      <>
        <h5>MAIN</h5>
        <Link to="/">
          <BsFillGrid1X2Fill className={classes.icon} /> Dashboard
        </Link>
        <h5>LISTS</h5>
        <Link to="/hotels">
          <BsFillBuildingFill className={classes.icon} />
          Hotels
        </Link>
        <br />
        <Link to="/rooms">
          <MdBedroomParent className={classes.icon} />
          Rooms
        </Link>
        <br />
        <Link to="/transactions">
          <FaMoneyCheck className={classes.icon} />
          Transactions
        </Link>
        <h5>CREATE NEW</h5>
        <Link to="/hotels/new">
          <BsFillBuildingFill className={classes.icon} />
          New Hotel
        </Link>
        <br />
        <Link to="/rooms/new">
          <MdBedroomParent className={classes.icon} />
          New Room
        </Link>
        <h5>USER ({loaderData.adminUser.username})</h5>
        <Link to="/logout">
          <MdBedroomParent className={classes.icon} />
          Log Out
        </Link>
      </>
    );
  };

  const NotLoggedInNavs = () => {
    return (
      <>
        <h5>USER</h5>
        <Link to="/login">
          <MdBedroomParent className={classes.icon} />
          Log In
        </Link>
        <br />
        <Link to="/register">
          <MdBedroomParent className={classes.icon} />
          Register
        </Link>
      </>
    );
  };

  return (
    <div className={classes.navbar}>
      {loaderData.token ? <LoggedInNavs /> : <NotLoggedInNavs />}
    </div>
  );
};

export default NavBar;
