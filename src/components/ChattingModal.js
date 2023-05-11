import React, { useState, useEffect } from "react";
import chatbot from "./image/chat.png";
import Home from "../pages/Home";
import x from "../components/image/x.png";

function ChattingModal() {
  // 로그인 상태 관리
  const [log, setLog] = useState(null);
  const [nickname, setNickname] = useState("");
  useEffect(() => {
    if (localStorage.getItem("login") === null) {
      setLog(true);
    } else {
      setLog(false);
      const loginInfo = JSON.parse(localStorage.getItem("login"));
      setNickname(loginInfo.nickname);
    }
  }, [log]);

  const [showModal, setShowModal] = useState(false);
  const handleButtonClick1 = () => {
    setShowModal(!showModal);
  };

  /*   const handleButtonClick2 = () => {
    setShowModal(false);
  };
 */
  return (
    <div style={{ position: "relative" }}>
      {log === false && (
        <button
          style={{
            position: "fixed",
            top: "80%",
            left: "1%",
            transform: "translate(50%, -50%)",

            color: "white",
            padding: "10px 20px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            zIndex: "999",
          }}
          onClick={handleButtonClick1}
        >
          <img src={chatbot} alt="My Image" style={{ width: 50, height: 50 }} />
        </button>
      )}
      {showModal && (
        <div
          style={{
            position: "fixed",
            top: "30%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "#a7bcff",

            borderRadius: "5px",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
            zIndex: "999",
            width: "1200px", // 추가
            height: "600px",
          }}
        >
          <img src={x} alt="" style={{ width: "50px", cursor: "pointer" }} onClick={handleButtonClick1} />

          <Home />
        </div>
      )}
    </div>
  );
}

export default ChattingModal;
