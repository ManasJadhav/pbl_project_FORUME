import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Modal from "react-modal";
import CrossLogo from "./logo/crosslogo";
import "./App.css";
import Home from "./pages/Home";
import Compose from "./pages/Compose";
import RenderAnswer from "./pages/RenderAnswer";
import Categories from "./pages/Categories";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import ForgotPassword from "./pages/ForgotPassword";
import Signup from "./components/Signup";
import ProfileTemp from "./components/ProfileTemp";
import Academicpost from "./pages/Academicpost";
import Clubpost from "./pages/Clubpost";
import Cocurricularpost from "./pages/Cocurricularpost";
import AllPost from "./pages/AllPost";
import Answer from "./components/Answer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
Modal.setAppElement("#root");

function App() {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalIsOpenSignup, setIsOpenSignup] = useState(false);
  const [showProfile, setShowProfile] = useState("hidden");
  const [toastShow, setToastShow] = useState(false);
  const [toastCondition, setToastCondition] = useState({
    status: "",
    message: "",
  });

  if (toastShow) {
    if (toastCondition.status === "success") {
      toast.success(toastCondition.message);
    } else if (toastCondition.status === "error") {
      toast.error(toastCondition.message);
    } else if (toastCondition.status === "warning") {
      toast.warn(toastCondition.message);
    } else if (toastCondition.status == "info") {
      toast.info(toastCondition.message);
    }
    setToastCondition({
      status: "",
      message: "",
    });
    setToastShow(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  function openModalSignup() {
    setIsOpenSignup(true);
    setIsOpen(false);
  }

  function closeModal() {
    setIsOpen(false);
  }

  function closeModalSignup() {
    setIsOpenSignup(false);
  }

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  const [id, setId] = useState("");
  return (
    <div className="App h-screen w-screen scrollbar-hide">
      <Navbar openModal={openModal} setShowProfile={setShowProfile} />
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <button onClick={closeModal}>
          <CrossLogo />
        </button>
        <Login
          setToastCondition={setToastCondition}
          setToastShow={setToastShow}
          openModalSignup={openModalSignup}
          closeModal={closeModal}
        />
      </Modal>

      <Modal
        isOpen={modalIsOpenSignup}
        onRequestClose={closeModalSignup}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <button onClick={closeModalSignup}>
          <CrossLogo />
        </button>
        <Signup closeModalSignup={closeModalSignup} />
      </Modal>
      <Routes>
        <Route path="/" element={<Home openModal={openModal} />} />

        <Route path="postanswer" element={<RenderAnswer id={id} />} />
        <Route path="post" element={<AllPost id={id} setId={setId} />} />
        <Route
          path="compose"
          element={
            <Compose
              setToastCondition={setToastCondition}
              setToastShow={setToastShow}
            />
          }
        />
        <Route
          path="answer"
          element={
            <Answer
              id={id}
              setToastCondition={setToastCondition}
              setToastShow={setToastShow}
            />
          }
        />
        <Route
          path="academicspost"
          element={<Academicpost id={id} setId={setId} />}
        />
        <Route path="clubpost" element={<Clubpost id={id} setId={setId} />} />
        <Route
          path="cocurricularpost"
          element={<Cocurricularpost id={id} setId={setId} />}
        />
        <Route path="categories" element={<Categories />} />
        <Route path="forgotPassword" element={<ForgotPassword />} />
      </Routes>

      <ProfileTemp show={showProfile} />

      <ToastContainer />
    </div>
  );
}

export default App;
