import React from "react";
// import { useNavigate } from "react-router-dom";
import Forume from "../images/Forume.png";

export default function Answertemp(props) {
  // const navigate = useNavigate(props);
  return (
    <div>
      <div className="relative top-24 mb-10">
        <div className="flex bg-white shadow-xl shadow-blue-10 rounded-lg mx-4 md:mx-auto max-w-md md:max-w-2xl ">
          <div className="flex items-start px-4 py-6">
            <img
              className="w-12 h-12 rounded-full object-cover mr-4 shadow"
              src={Forume}
              alt="avatar"
            />
            <div className="">
              <p className="text-gray-700">{props.answer.author}</p>

              <p className="mt-3 text-gray-700 text-sm">
                {props.answer.answer}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
