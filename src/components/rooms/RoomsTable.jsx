import React, { useState } from "react";
import classes from "./RoomsTable.module.css";
import { Link, useLoaderData, useNavigate } from "react-router-dom";

const RoomsTable = (props) => {
  const allRooms = useLoaderData();
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const deleteHandler = async (e) => {
    setError(null);
    if (!window.confirm("Are you sure?")) return;

    const token = localStorage.getItem("token");
    // prettier-ignore
    const myHeaders = new Headers({ "Authorization": token, "Content-Type": "application/json"});

    try {
      const response = await fetch(
        `http://localhost:5000/admin/rooms/delete/${e.target.dataset.id}`,
        {
          headers: myHeaders,
        }
      );
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message);
      }
      if (response.status === 200) {
        window.location.reload(false);
      }
    } catch (error) {
      setError(error);
    }
  };

  const editHandler = (e) => {
    navigate(`/rooms/edit/${e.target.dataset.id}`);
  };

  return (
    <div className={classes.roomsSection}>
      <div className={classes.titleSection}>
        <h2>ROOMS LIST</h2>
        <Link to="/rooms/new" className={classes.new_btn}>
          Add New
        </Link>
      </div>

      {error && <h4 className={classes.errorText}>{error.message}</h4>}
      <table className={classes.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Description</th>
            <th>Price</th>
            <th>Max People</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {allRooms?.map((room) => {
            return (
              <tr key={room._id}>
                <td>{room._id}</td>
                <td>
                  <b>{room.title}</b>
                </td>
                <td>{room.desc}</td>
                <td>${room.price}</td>
                <td>{room.maxPeople} people</td>
                <td className={classes.actiontd}>
                  <button
                    data-id={room._id}
                    className={classes.delete_btn}
                    onClick={deleteHandler}
                  >
                    Delete
                  </button>
                  <button
                    data-id={room._id}
                    className={classes.edit_btn}
                    onClick={editHandler}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default RoomsTable;
