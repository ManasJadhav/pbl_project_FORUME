import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Answertemp from "../components/Answertemp";

export default function RenderAnswer(props) {
  const navigate = useNavigate();
  const [post, setPost] = useState({
    answers: [{ answer: "", author: "" }],
  });
  useEffect(() => {
    async function handleRender() {
      const res = await fetch(`/getAnswer/${props.id}`);
      const data = await res.json();
      if (data.error) {
        navigate("/");
      } else {
        const temppost = { ...post };
        temppost.answers = data.post.answers;
        temppost.description = data.post.description;
        setPost(temppost);
      }
    }
    handleRender();
  }, []);

  return (
    <div className="">
      <div className="flex justify-center relative top-24">
        <h1 className="text-2xl text-blue-2 font-roboto">Q. </h1>
        <h1 className="text-2xl text-blue-2 font-roboto">{post.description}</h1>
      </div>
      <div>
        {post.answers.map((answer) => {
          return <Answertemp answer={answer} key={answer._id} />;
        })}
      </div>
      <div className="fixed right-10 bottom-10">
        <button
          className="hover:scale-110 bg-blue-2 text-white font-bold px-5 py-3 rounded-md"
          onClick={() => {
            navigate("/answer");
          }}
        >
          Answer
          {/* <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16"
            viewBox="0 0 20 20"
            fill="#013A63"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
              clipRule="evenodd"
            />
          </svg> */}
        </button>
      </div>
    </div>
  );
}
