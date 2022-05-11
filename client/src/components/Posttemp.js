import React from "react";
import { useNavigate } from "react-router-dom";
import Forume from "../images/Forume.png";

export default function Posttemp(props) {
  const navigate = useNavigate();
  return (
    <div className="relative top-24 mb-10">
      <div className="flex bg-white shadow-xl shadow-blue-10 rounded-lg mx-4 md:mx-auto max-w-md md:max-w-2xl ">
        <div className="flex items-start px-4 py-6">
          <img
            className="w-12 h-12 rounded-full object-cover mr-4 shadow"
            src={Forume}
            alt="avatar"
          />
          <div className="">
            <p className="text-gray-700">{props.post.author}</p>

            <h2 className="mt-3 text-gray-700 text-sm">{props.post.title}</h2>

            <p className="mt-3 text-gray-700 text-sm">
              {props.post.description}
            </p>
            <div className="mt-4 flex items-center">
              <div className="flex mr-2 text-gray-700 text-sm">
                <button
                  className="hover:scale-110"
                  onClick={() => {
                    props.setId(props.post._id);
                    navigate("/postanswer");
                  }}
                >
                  <svg
                    fill="none"
                    viewBox="0 0 24 24"
                    className="w-6 h-6 mr-1"
                    stroke="currentColor"
                  >
                    <path
                      // stroke-linecap="round"
                      // stroke-linejoin="round"
                      // stroke-width="2"
                      d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
