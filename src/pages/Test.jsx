import React from "react";
import { useLoaderData } from "react-router-dom";

const Test = (props) => {
  const loaderData = useLoaderData();

  console.log(loaderData);

  return (
    <>
      <h1>Test page</h1>
    </>
  );
};

export default Test;

export const testLoader = async ({ params }) => {
  try {
    const response = await fetch(`http://localhost:5000/test`);
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
};
