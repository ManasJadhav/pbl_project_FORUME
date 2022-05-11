import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ReactLoading from "react-loading";

export default function Answer(props) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [postAnswer, setPostAnswer] = useState({
    author: "",
    answer: "",
    postId: props.id,
  });
  const [error, setError] = useState({
    author: "",
    answer: "",
    postId: "",
  });
  const [question, setQuestion] = useState("");

  useEffect(() => {
    async function handleUser() {
      const res = await fetch("/getUser");
      const data = await res.json();
      if (data.error) {
        navigate("/");
      } else {
        const tempAnswer = { ...postAnswer };
        tempAnswer.author = data.user.email;
        setPostAnswer(tempAnswer);
      }
    }
    async function handlegetPost(e) {
      const res = await fetch(`/getAnswer/${props.id}`);
      const data = await res.json();
      console.log(data);
      if (data.errors) {
        navigate("/");
      } else {
        setQuestion(data.post.description);
      }
    }
    handleUser();
    handlegetPost();
  }, []);

  const handleComposeAnswer = async () => {
    setIsLoading(true);
    const res = await fetch("/answer", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(postAnswer),
    });
    const data = await res.json();
    if (data.errors) {
      setIsLoading(false);
      setError(data.errors);
      props.setToastCondition({
        status: "error",
        message:
          (error.answer || error.author) === ""
            ? "please fill out all fields"
            : error.answer || error.author,
      });
      props.setToastShow(true);
    } else {
      props.setToastCondition({
        status: "success",
        message: "Successfully Posted",
      });
      props.setToastShow(true);
      setIsLoading(false);
      navigate(-1);
    }
  };
  return (
    <form>
      <div className="grid place-items-center h-screen">
        <div className="text-blue-8 bg-blue-1 mx-auto p-8 w-3/4 border shadow-md shadow-blue-500/40 rounded-md">
          <div>
            <span>
              <h1 className="text-xl capitalize">{question} ?</h1>
            </span>
          </div>
          <div className="mt-4">
            <h3 className="text-lg">Answer</h3>
            <textarea
              value={postAnswer.answer}
              onChange={(e) => {
                const tempAnswer = { ...postAnswer };
                tempAnswer.answer = e.target.value;
                setPostAnswer(tempAnswer);
                if (postAnswer.answer.length >= 10) {
                  error.answer = "";
                }
              }}
              className="text-lg h-28 mt-2 bg-gray-50 border-0 border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 "
            ></textarea>
          </div>
          <div className="mt-3">
            {isLoading ? (
              <ReactLoading
                type={"cylon"}
                color={"#89C2D9"}
                height={"7%"}
                width={"7%"}
              />
            ) : (
              <button
                type="button"
                onClick={handleComposeAnswer}
                className="border-2 border-blue-8 hover:bg-white hover:text-blue-2 px-6 py-3 rounded-md text-blue-8"
              >
                Submit
              </button>
            )}
          </div>
        </div>
      </div>
    </form>
  );
}
