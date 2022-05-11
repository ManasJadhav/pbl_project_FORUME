import React, { useState } from "react";
import "../css/Login.css";

export default function Login(props) {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async (e) => {
    e.preventDefault();

    setError({
      email: "",
      password: "",
    });

    const res = await fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    const data = await res.json();
    console.log(data);
    console.log(data.errors);

    if (data.errors) {
      setError(data.errors);
    } else {
      props.setToastCondition({
        status: "success",
        message: "Logged in SuccessFully",
      });

      props.closeModal();
      props.setToastShow(true);
      window.location.reload();
    }
  };
  return (
    <div>
      <div className="container">
        <form onSubmit={handleLogin}>
          <div className="mainHeading">
            <h1>Login</h1>
          </div>

          <div className="mailId">
            <i className="fas fa-user"></i>
            <input
              type="text"
              placeholder="Enter Email"
              value={user.email}
              onChange={(e) => {
                const tempUser = { ...user };
                tempUser.email = e.target.value;
                setUser(tempUser);
              }}
            />
            <br />
          </div>
          <span className="email error text-pink-mj mx-3 my-1 text-sm font-bold">
            {error.email}
          </span>
          <div className="password">
            <i className="fas fa-lock"></i>
            <input
              type="password"
              placeholder="Enter Password"
              value={user.password}
              onChange={(e) => {
                const tempUser = { ...user };
                tempUser.password = e.target.value;
                setUser(tempUser);
              }}
            />
          </div>
          <span className="email error text-pink-mj mx-1 my-1 text-sm font-bold">
            {error.password}
          </span>
          <div className="button">
            <a href="login.html ">
              <input type="submit" value="login" />
            </a>
          </div>

          <div className="forgot">
            <a href="/login">
              <h4>Forgot Password?</h4>
            </a>
          </div>

          <div className="text-center">
            <h2
              onClick={props.openModalSignup}
              className="text-md font-roboto cursor-pointer"
            >
              SignUp
            </h2>
          </div>
        </form>
      </div>
    </div>
  );
}
