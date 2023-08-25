import React, { useRef, useState } from "react";
import classes from "./LoginForm.module.css";

const LoginForm = (props) => {
  const emailInput = useRef();
  const passwordInput = useRef();
  const [errorState, setErrorState] = useState();

  const submitHandler = async (e) => {
    e.preventDefault();
    setErrorState(false);
    if (!emailInput.current.value) {
      alert("Please input email");
      return;
    }
    if (!passwordInput.current.value) {
      alert("Please input password");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: emailInput.current.value,
          password: passwordInput.current.value,
        }),
      });
      const result = await response.json();

      // If respone not ok
      if (!response.ok) {
        throw new Error(result.message);
      } else {
        // if ok, store token in localstorage and login
        console.log(result);
        localStorage.setItem("token", result.token);
        localStorage.setItem("adminUser", JSON.stringify(result.user));
        window.location.href = "/";
      }
    } catch (error) {
      setErrorState(error.message);
    }
  };

  return (
    <section className={classes.loginSection}>
      <h1>Login</h1>
      {errorState ? <h3>{errorState}</h3> : ""}
      <form className={classes.form} onSubmit={submitHandler}>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Please input Email"
          ref={emailInput}
        />
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Please input Password"
          ref={passwordInput}
        />
        <button className={classes.btn} type="submit">
          Login
        </button>
      </form>
    </section>
  );
};

export default LoginForm;
