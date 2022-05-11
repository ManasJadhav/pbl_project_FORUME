import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import HomeImage from "../images/HomeImage.png";
import Footer from "../components/Footer";

export default function Home(props) {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    async function handleUser() {
      const res = await fetch("/getUser");
      const data = await res.json();
      console.log(data);
      if (data.error) {
        setIsLoggedIn(false);
      } else {
        setIsLoggedIn(true);
      }
    }
    handleUser();
  }, []);
  return (
    <div>
      <div className="grid grid-cols-2 pl-24 py-10">
        <div className="mt-24">
          <h1 className="text-5xl font-bold text-blue-3">Pict Forum</h1>
          <h1 className="text-3xl py-8">Interact with your Peers</h1>
          <p className="text-lg">
            Ask and Solve doubts about various topic's and discuss Offbeat
          </p>
          {isLoggedIn ? (
            <button
              className="my-5 px-8 py-4 bg-blue-2 font-bold rounded-full"
              onClick={() => {
                navigate("/post");
              }}
            >
              <h1 className="text-white">See Post</h1>
            </button>
          ) : (
            <button
              onClick={props.openModal}
              className="my-5 px-8 py-4 bg-blue-2 font-bold rounded-full"
            >
              <h1 className="text-white">Get Started</h1>
            </button>
          )}
        </div>
        <div>
          <img src={HomeImage}></img>
        </div>
      </div>
      <Footer />
    </div>
  );
}
