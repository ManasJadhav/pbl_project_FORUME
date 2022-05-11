import React from "react";
import { Link } from "react-router-dom";
import Club from "../images/Club.png";
import Academics from "../images/Academics.png";
import Curricular from "../images/curricular.png";

export default function Categories() {
  return (
    <div className="flex justify-around">
      <Link to="/academicspost">
        <div className="flex justify-evenly mt-36">
          <div className="max-w-sm rounded overflow-hidden shadow-lg">
            <img className="w-full" src={Academics} />
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">Academics</div>
              <p className="text-gray-700 text-base">
                Ask and solve doubts regarding Academics.
              </p>
            </div>
          </div>
        </div>
      </Link>

      <Link to="/cocurricularpost">
        <div className="flex justify-evenly mt-36">
          <div className="max-w-sm rounded overflow-hidden shadow-lg">
            <img className="w-full" src={Curricular} />
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">Co-Curricular</div>
              <p className="text-gray-700 text-base">
                Ask and solve doubts regarding Co-Curricular Activities around
                the college.
              </p>
            </div>
          </div>
        </div>
      </Link>

      <Link to="/clubpost">
        <div className="flex justify-evenly mt-36">
          <div className="max-w-sm rounded overflow-hidden shadow-lg">
            <img className="w-full" src={Club} />
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">Clubs</div>
              <p className="text-gray-700 text-base">
                Ask and solve doubts regarding different Clubs in college.
              </p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
