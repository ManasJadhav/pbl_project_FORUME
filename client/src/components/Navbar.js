import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import { useLocation } from "react-router-dom";

export default function Navbar(props) {
  const navigate = useNavigate();
  const [isLoggedin, setIsLoggedin] = useState(false);
  useEffect(() => {
    async function handleNavbar() {
      const res = await fetch("/getUser");
      const data = await res.json();
      if (data.error) {
        setIsLoggedin(false);
      } else {
        setIsLoggedin(true);
      }
    }
    handleNavbar();
  });

  const handleLogout = async () => {
    const res = await fetch("/logout");
    setIsLoggedin(false);
    window.location.reload();
    navigate("/");
  };

  // const location = useLocation();
  return (
    <div className="z-10 fixed w-full text-white bg-blue-1 flex px-14 py-4 justify-between">
      <h1 className="text-2xl font-bold"> Forume</h1>
      <nav className="flex justify-between w-80">
        <Link to="/">
          <h1>Home</h1>
        </Link>
        <Link to="/categories">
          <h1>Categories</h1>
        </Link>
        <Link to="/post">
          <h1>Posts</h1>
        </Link>
        {isLoggedin ? (
          <h1
            onMouseEnter={() => {
              {
                props.setShowProfile("visible");
              }
            }}
            onMouseLeave={() => {
              {
                props.setShowProfile("hidden");
              }
            }}
          >
            Profile
          </h1>
        ) : undefined}
        <h1>
          {isLoggedin ? (
            <h1 className="cursor-pointer" onClick={handleLogout}>
              Logout
            </h1>
          ) : (
            <h1 onClick={props.openModal} className="cursor-pointer text-white">
              Login
            </h1>
          )}
        </h1>
      </nav>
    </div>
  );
}
