import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function Signup(props) {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSignup = async (e) => {
    e.preventDefault();

    setError({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    });

    const res = await fetch("/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    const data = await res.json();
    if (data.errors) {
      setError(data.errors);
    } else {
      props.closeModalSignup();
      window.location.reload();
    }
  };

  return (
    <div>
      <div className="container">
        <form onSubmit={handleSignup}>
          <div className="mainHeading">
            <h1>SignUp</h1>
          </div>

          <div className="mailId">
            <i className="fas fa-user"></i>
            <input
              type="text"
              placeholder="Enter name"
              value={user.name}
              onChange={(e) => {
                const tempUser = { ...user };
                tempUser.name = e.target.value;
                setUser(tempUser);
              }}
            />
            <br />
          </div>
          <span className="text-pink-mj mx-3 my-1 text-sm font-bold">
            {error.name}
          </span>
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
          <span className="email error text-pink-mj mx-3 my-1 text-sm font-bold">
            {error.password}
          </span>
          <div className="password">
            <i className="fas fa-lock"></i>
            <input
              type="password"
              placeholder="Confirm Password"
              value={user.confirmPassword}
              onChange={(e) => {
                const tempUser = { ...user };
                tempUser.confirmPassword = e.target.value;
                setUser(tempUser);
              }}
            />
          </div>
          <span className="email error text-pink-mj mx-3 my-1 text-sm font-bold">
            {error.confirmPassword}
          </span>
          <div className="button">
            <a href="signup.html">
              <input type="submit" value="signup" />
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
