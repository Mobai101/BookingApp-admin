import React, { useRef, useState } from "react";
import classes from "./NewRoomForm.module.css";
import { useLoaderData, useParams } from "react-router-dom";

const NewRoomForm = (props) => {
  //#region useRef Inputs
  const titleInput = useRef();
  const descInput = useRef();
  const priceInput = useRef();
  const maxPeopleInput = useRef();
  const roomsInput = useRef();
  //#endregion

  const loaderData = useLoaderData();
  console.log(loaderData);

  const params = useParams();

  const [error, setError] = useState(null);

  const submitHander = async (e) => {
    e.preventDefault();
    setError(null);

    //#region validate input fields
    if (!titleInput.current.value) {
      alert("Please input title!");
      return;
    }
    if (!descInput.current.value) {
      alert("Please input description!");
      return;
    }
    if (!priceInput.current.value) {
      alert("Please input price!");
      return;
    }
    if (!maxPeopleInput.current.value) {
      alert("Please input number of max people!");
      return;
    }
    if (!roomsInput.current.value) {
      alert("Please input at least one room number!");
      return;
    }
    //#endregion

    const sendData = {
      title: titleInput.current.value,
      desc: descInput.current.value,
      price: priceInput.current.value,
      maxPeople: maxPeopleInput.current.value,
      rooms: roomsInput.current.value.split(","),
    };

    const myHeaders = new Headers({
      Authorization: localStorage.getItem("token"),
      "Content-Type": "application/json",
    });

    let response;

    try {
      if (loaderData) {
        response = await fetch(
          `http://localhost:5000/admin/rooms/edit/${params.roomId}`,
          {
            method: "POST",
            headers: myHeaders,
            body: JSON.stringify(sendData),
          }
        );
      } else {
        response = await fetch("http://localhost:5000/admin/rooms/new", {
          method: "POST",
          headers: myHeaders,
          body: JSON.stringify(sendData),
        });
      }

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message);
      }

      if (response.status === 201) {
        window.location.href = "/rooms";
      }
    } catch (error) {
      setError(error);
    }
  };

  return (
    <div className={classes.newRoomSection}>
      {loaderData ? <h2>Edit Room</h2> : <h2>Add new Room</h2>}
      {error && (
        <>
          <p className={classes.errorText}>{error.message}</p>
        </>
      )}
      <form onSubmit={submitHander} className={classes.newRoomForm}>
        <div className={classes.inputDiv}>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            ref={titleInput}
            id="title"
            defaultValue={loaderData?.title}
          />
        </div>
        <div className={classes.inputDiv}>
          <label htmlFor="desc">Description</label>
          <input
            type="text"
            ref={descInput}
            id="desc"
            defaultValue={loaderData?.desc}
          />
        </div>
        <div className={classes.inputDiv}>
          <label htmlFor="price">Price</label>
          <input
            type="number"
            ref={priceInput}
            id="price"
            defaultValue={loaderData?.price}
          />
        </div>
        <div className={classes.inputDiv}>
          <label htmlFor="maxPeople">Max People</label>
          <input
            type="number"
            ref={maxPeopleInput}
            id="maxPeople"
            defaultValue={loaderData?.maxPeople}
          />
        </div>
        <div className={classes.inputDiv}>
          <label htmlFor="rooms">
            Rooms (separate each room number by comma ",")
          </label>
          <textarea
            ref={roomsInput}
            id="rooms"
            defaultValue={loaderData?.roomNumbers.join(",")}
          />
        </div>
        <button className={classes.sendBtn}>
          {loaderData ? "Update" : "Create"}
        </button>
      </form>
    </div>
  );
};

export default NewRoomForm;
