import React, { useState } from "react";
import classes from "./HotelsTable.module.css";
import { Link, useLoaderData, useNavigate } from "react-router-dom";

const HotelsTable = (props) => {
  const allHotels = useLoaderData();
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
        `http://localhost:5000/admin/hotels/delete/${e.target.dataset.id}`,
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
    navigate(`/hotels/edit/${e.target.dataset.id}`);
  };

  return (
    <div className={classes.hotelsSection}>
      <div className={classes.titleSection}>
        <h2>HOTELS LIST</h2>
        <Link to="/hotels/new" className={classes.new_btn}>
          Add New
        </Link>
      </div>
      {error && <h4 className={classes.errorText}>{error.message}</h4>}
      <table className={classes.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Type</th>
            <th>Address</th>
            <th>Rating</th>
            <th>City</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {allHotels?.map((hotel) => {
            return (
              <tr key={hotel._id}>
                <td>{hotel._id}</td>
                <td>
                  <b>{hotel.name}</b>
                </td>
                <td>{hotel.type}</td>
                <td>{hotel.address}</td>
                <td>{hotel.rating}</td>
                <td>{hotel.city}</td>
                <td className={classes.actiontd}>
                  <button
                    data-id={hotel._id}
                    className={classes.delete_btn}
                    onClick={deleteHandler}
                  >
                    Delete
                  </button>
                  <button
                    data-id={hotel._id}
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

export default HotelsTable;
