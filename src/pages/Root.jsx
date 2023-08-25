import React from "react";

import { Outlet } from "react-router-dom";
import NavBar from "../components/root/NavBar";
import Header from "../components/root/Header";

const Root = () => {
  return (
    <>
      <Header />
      <div className="flex_container">
        <NavBar />
        <div>
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Root;

export const rootLoader = () => {
  const token = localStorage.getItem("token");
  const adminUser = JSON.parse(localStorage.getItem("adminUser"));
  return { token, adminUser };
};
