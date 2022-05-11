import React, { useEffect, useState } from "react";
import ReactLoading from "react-loading";
import { useNavigate } from "react-router-dom";

export default function Compose(props) {
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const [post, setpost] = useState({
    author: "",
    title: "",
    tag: "",
    description: "",
  });

  const [error, setError] = useState({
    author: "",
    title: "",
    tag: "",
    description: "",
  });

  useEffect(() => {
    async function handleProfile() {
      const res = await fetch("/getUser");
      const data = await res.json();
      if (data.error) {
        navigate("/");
      } else {
        const tempPost = { ...post };
        tempPost.author = data.user.email;
        setpost(tempPost);
      }
    }
    handleProfile();
  }, []);

  const handleCompose = async (e) => {
    setIsLoading(true);
    const res = await fetch("/compose", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(post),
    });

    const data = await res.json();
    if (data.errors) {
      setIsLoading(false);
      setError(data.errors);
      props.setToastCondition({
        status: "error",
        message:
          (error.title || error.description || error.tag) === ""
            ? "please fill out all fields"
            : error.title || error.description || error.tag,
      });
      props.setToastShow(true);
    } else {
      props.setToastCondition({
        status: "success",
        message: `Successfully Posted in ${post.tag} section`,
      });
      props.setToastShow(true);
      setIsLoading(false);
      navigate(-1);
    }
  };
  return (
    <div>
      <form>
        <div className="grid place-items-center h-screen">
          <div className=" w-3/4 p-8 border  bg-blue-1 shadow-lg shadow-blue-8/80 rounded-lg  text-blue-8">
            <div className="flex items-center mb-6">
              <h3 className="text-lg mr-5">Title</h3>
              <input
                className="text-lg bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/2 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 "
                type="text"
                placeholder="Enter Title"
                value={post.title}
                onChange={(e) => {
                  const tempPost = { ...post };
                  tempPost.title = e.target.value;
                  if (tempPost.title.length >= 5) {
                    error.title = "";
                  }
                  setpost(tempPost);
                }}
              />
              <br />
            </div>
            <div className=" mb-6 ">
              <div className="mx-1 grid grid-cols-3 ">
                <div className="flex">
                  <input
                    id="radio1"
                    type="radio"
                    name="radio"
                    className="hidden"
                    label="Club"
                    value="Club"
                    // checked={post.tag === "Club"}
                    onChange={(e) => {
                      const tempPost = { ...post };
                      console.log(e.target.value);
                      tempPost.tag = e.target.value;

                      if (tempPost.tag != "") {
                        error.tag = "";
                      }
                      setpost(tempPost);
                    }}
                  />
                  <label
                    for="radio1"
                    className=" flex items-center cursor-pointer"
                  >
                    <span className="w-4 h-4 inline-block mr-2 border border-grey"></span>
                    Club
                  </label>
                </div>

                <div className="flex">
                  <input
                    id="radio2"
                    type="radio"
                    name="radio"
                    className="hidden"
                    label="Co-Curricular"
                    value="Co-Curricular"
                    // checked={post.tag === "Co-Curricular"}
                    onChange={(e) => {
                      const tempPost = { ...post };
                      tempPost.tag = e.target.value;
                      if (tempPost.tag != "") {
                        error.tag = "";
                      }
                      setpost(tempPost);
                    }}
                  />
                  <label
                    for="radio2"
                    className=" flex items-center cursor-pointer"
                  >
                    <span className="w-4 h-4 inline-block mr-2 border border-grey"></span>
                    Co-Curricular
                  </label>
                </div>

                <div className="flex">
                  <input
                    id="radio3"
                    type="radio"
                    name="radio"
                    className="hidden"
                    label="Academics"
                    value="Academics"
                    // checked={post.tag === "Academics"}
                    onChange={(e) => {
                      const tempPost = { ...post };
                      tempPost.tag = e.target.value;
                      if (tempPost.tag != "") {
                        error.tag = "";
                      }
                      setpost(tempPost);
                    }}
                  />
                  <label
                    for="radio3"
                    className="flex items-center cursor-pointer"
                  >
                    <span className="w-4 h-4 inline-block mr-2 border border-grey"></span>
                    Academics
                  </label>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-lg">Description</h3>
              <textarea
                value={post.description}
                onChange={(e) => {
                  const tempPost = { ...post };
                  tempPost.description = e.target.value;

                  setpost(tempPost);
                  if (tempPost.description.length >= 10) {
                    error.description = "";
                  }
                }}
                className="text-lg h-28 mt-2 bg-gray-50 border-0 border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500  "
              ></textarea>
              <br />
            </div>
            <div className="">
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
                  onClick={handleCompose}
                  className="border-2 border-blue-8 hover:bg-white hover:text-blue-2 px-6 py-3 rounded-md text-blue-8"
                >
                  Submit
                </button>
              )}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
