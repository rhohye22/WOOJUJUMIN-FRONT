import React, { useState } from "react";
import chatbot from "./image/chat.png";
import Home from "../pages/Home";

function ChattingModal() {
  const [showModal, setShowModal] = useState(false);

  const handleButtonClick1 = () => {
    setShowModal(true);
  };
  const handleButtonClick2 = () => {
    setShowModal(false);
  };

  return (
    <div style={{ position: "relative" }}>
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
        <img src={chatbot} alt="My Image" style={{ width: 60, height: 60 }} />
      </button>
      {showModal && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "25%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "5px",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
            zIndex: "999",
            width: "600px", // 추가
            height: "700px",
          }}
        >
          <Home />
          <button onClick={handleButtonClick2}>닫기</button>
        </div>
      )}
    </div>
  );
}

export default ChattingModal;
