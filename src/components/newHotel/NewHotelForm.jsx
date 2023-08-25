import React, { useRef, useState } from "react";
import classes from "./NewHotelForm.module.css";
import Multiselect from "multiselect-react-dropdown";
import { useLoaderData, useParams } from "react-router-dom";

const NewHotelForm = (props) => {
  //#region useRef Inputs
  const nameInput = useRef();
  const typeInput = useRef();
  const cityInput = useRef();
  const addressInput = useRef();
  const distanceInput = useRef();
  const ratingInput = useRef();
  const descInput = useRef();
  const priceInput = useRef();
  const featuredInput = useRef();
  const imagesInput = useRef();
  const roomsSelect = useRef();
  //#endregion
  const [error, setError] = useState(null);

  const params = useParams();

  const loaderData = useLoaderData();
  const foundHotel = loaderData.foundHotel;
  const allRooms = loaderData.allRooms;

  const submitHander = async (e) => {
    e.preventDefault();
    setError(null);

    //#region validate input fields
    if (!nameInput.current.value) {
      alert("Please input name!");
      return;
    }
    if (!typeInput.current.value) {
      alert("Please input type!");
      return;
    }
    if (!cityInput.current.value) {
      alert("Please input city!");
      return;
    }
    if (!addressInput.current.value) {
      alert("Please input address!");
      return;
    }
    if (!distanceInput.current.value) {
      alert("Please input distance from city center!");
      return;
    }
    if (!ratingInput.current.value) {
      alert("Please input rating!");
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
    if (roomsSelect.current.state.selectedValues.length === 0) {
      alert("Please select at least one room!");
      return;
    }
    //#endregion

    const sendData = {
      name: nameInput.current.value,
      type: typeInput.current.value,
      city: cityInput.current.value,
      address: addressInput.current.value,
      distance: distanceInput.current.value,
      rating: ratingInput.current.value,
      desc: descInput.current.value,
      price: priceInput.current.value,
      rooms: roomsSelect.current.state.selectedValues,
      featured: featuredInput.current.value,
      images: imagesInput.current.value.split(","),
    };

    const myHeaders = new Headers({
      Authorization: localStorage.getItem("token"),
      "Content-Type": "application/json",
    });

    let response;

    try {
      if (foundHotel) {
        response = await fetch(
          `http://localhost:5000/admin/hotels/edit/${params.hotelId}`,
          {
            method: "POST",
            headers: myHeaders,
            body: JSON.stringify(sendData),
          }
        );
      } else {
        response = await fetch("http://localhost:5000/admin/hotels/new", {
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
        window.location.href = "/hotels";
      }
    } catch (error) {
      setError(error);
    }
  };

  return (
    <div className={classes.newHotelSection}>
      {foundHotel ? <h2>Edit Hotel</h2> : <h2>Add new Hotel</h2>}

      {error && (
        <>
          <p className={classes.errorText}>{error.message}</p>
        </>
      )}
      <form onSubmit={submitHander} className={classes.newHotelForm}>
        <div className={classes.inputDiv}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            ref={nameInput}
            id="name"
            defaultValue={foundHotel?.name}
          />
        </div>
        <div className={classes.inputDiv}>
          <label htmlFor="type">Type</label>
          <input
            type="text"
            ref={typeInput}
            id="type"
            defaultValue={foundHotel?.type}
          />
        </div>
        <div className={classes.inputDiv}>
          <label htmlFor="city">City</label>
          <input
            type="text"
            ref={cityInput}
            id="city"
            defaultValue={foundHotel?.city}
          />
        </div>
        <div className={classes.inputDiv}>
          <label htmlFor="address">Address</label>
          <input
            type="text"
            ref={addressInput}
            id="address"
            defaultValue={foundHotel?.address}
          />
        </div>
        <div className={classes.inputDiv}>
          <label htmlFor="distance">Distance from city center</label>
          <input
            type="number"
            ref={distanceInput}
            id="distance"
            min={0}
            defaultValue={foundHotel?.distance}
          />
        </div>
        <div className={classes.inputDiv}>
          <label htmlFor="rating">Rating</label>
          <input
            type="number"
            ref={ratingInput}
            min={0}
            max={10}
            id="rating"
            defaultValue={foundHotel?.rating}
          />
        </div>
        <div className={classes.inputDiv}>
          <label htmlFor="desc">Description</label>
          <input
            type="text"
            ref={descInput}
            id="desc"
            defaultValue={foundHotel?.desc}
          />
        </div>
        <div className={classes.inputDiv}>
          <label htmlFor="price">Price</label>
          <input
            type="number"
            ref={priceInput}
            id="price"
            defaultValue={foundHotel?.cheapestPrice}
          />
        </div>
        <div className={classes.inputDiv}>
          <Multiselect
            ref={roomsSelect}
            isObject={true}
            displayValue="title"
            selectedValues={foundHotel?.rooms}
            placeholder="Select Rooms"
            options={allRooms}
            style={{
              chips: {
                background: "#a581ff",
              },
              searchBox: {
                border: "none",
                borderBottom: "1px solid #787878",
                borderRadius: "0px",
              },
            }}
          />
        </div>
        <div className={classes.inputDiv}>
          <label htmlFor={classes.featured}>Featured</label>
          <select
            ref={featuredInput}
            id={classes.featured}
            defaultValue={foundHotel?.featured}
          >
            <option value="false">No</option>
            <option value="true">Yes</option>
          </select>
        </div>
        <div className={`${classes.inputDiv} ${classes.imageDiv}`}>
          <label htmlFor="images">
            Images (separate each link by comma ",")
          </label>
          <textarea
            ref={imagesInput}
            id="images"
            defaultValue={foundHotel?.photos.join(",")}
          />
        </div>
        <button className={classes.sendBtn}>
          {foundHotel ? "Update" : "Create"}
        </button>
      </form>
    </div>
  );
};

export default NewHotelForm;
