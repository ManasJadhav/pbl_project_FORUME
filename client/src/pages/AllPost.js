import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Posttemp from "../components/Posttemp";

export default function AllPost(props) {
  const navigate = useNavigate();
  const [post, setPost] = useState([]);
  useEffect(() => {
    async function handleAllPost() {
      const res = await fetch("/getAllPost");
      const data = await res.json();
      if (data.error) {
        navigate("/");
      } else {
        setPost(data.Posts);
      }
    }
    handleAllPost();
  }, []);

  return (
    <div>
      {post.map((post) => {
        return <Posttemp post={post} setId={props.setId} />;
      })}
      <div className="fixed right-10 bottom-10">
        <button
          className="hover:scale-110 "
          onClick={() => {
            navigate("/compose");
          }}
        >
          Answer
          <svg
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
          </svg>
        </button>
      </div>
    </div>
  );
}
