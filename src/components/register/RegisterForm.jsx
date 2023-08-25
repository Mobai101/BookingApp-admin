import React, { useRef, useState } from "react";
import classes from "./RegisterForm.module.css";
import { useNavigate } from "react-router-dom";

const RegisterForm = (props) => {
  const navigate = useNavigate();
  const usernameInput = useRef();
  const fullnameInput = useRef();
  const emailInput = useRef();
  const phoneInput = useRef();
  const idCardNumberInput = useRef();
  const passwordInput = useRef();
  const confirmInput = useRef();
  const [errorState, setErrorState] = useState();

  const submitHandler = async (e) => {
    e.preventDefault();
    setErrorState(false);
    //#region validating user input from frontend
    if (!usernameInput.current.value) {
      alert("Please input Username");
      return;
    }
    if (!fullnameInput.current.value) {
      alert("Please input your full name");
      return;
    }
    if (!emailInput.current.value) {
      alert("Please input Email");
      return;
    }
    if (!phoneInput.current.value) {
      alert("Please input phone number");
      return;
    }
    if (!idCardNumberInput.current.value) {
      alert("Please input ID Card Number");
      return;
    }
    if (!passwordInput.current.value) {
      alert("Please input password");
      return;
    }
    if (!confirmInput.current.value) {
      alert("Please input confirmation");
      return;
    }
    if (passwordInput.current.value !== confirmInput.current.value) {
      alert("Password and confirmation does not match");
      return;
    }
    //#endregion
    try {
      const response = await fetch("http://localhost:5000/admin/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: usernameInput.current.value,
          fullName: fullnameInput.current.value,
          email: emailInput.current.value,
          password: passwordInput.current.value,
          phoneNumber: phoneInput.current.value,
          idCardNumber: idCardNumberInput.current.value,
        }),
      });
      const result = await response.json();

      console.log(response);
      console.log(result);

      if (response.status === 201) {
        navigate("/login");
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      setErrorState(error.message);
    }
  };

  return (
    <section className={classes.registerSection}>
      <h1>Register</h1>
      {errorState ? <h3>{errorState}</h3> : ""}
      <form className={classes.form} onSubmit={submitHandler}>
        <input
          type="text"
          name="username"
          id="username"
          placeholder="Please input username *"
          ref={usernameInput}
        />
        <input
          type="text"
          name="fullname"
          id="fullname"
          placeholder="Please input your full name *"
          ref={fullnameInput}
        />
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Please input Email *"
          ref={emailInput}
        />
        <input
          type="tel"
          name="phone"
          id="phone"
          placeholder="Please input phone number *"
          ref={phoneInput}
        />
        <input
          type="number"
          name="idCardNumber"
          id="idCardNumber"
          placeholder="Please input ID Card Number *"
          ref={idCardNumberInput}
        />
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Please input Password *"
          ref={passwordInput}
        />
        <input
          type="password"
          name="confirm"
          id="confirm"
          placeholder="Please confirm Password *"
          ref={confirmInput}
        />
        <button className={classes.btn}>Register</button>
      </form>
    </section>
  );
};

export default RegisterForm;
