import React, { useState } from "react";
import chatbot from "./image/free-icon-chatbot-6819697.png";

function ChatbotModal() {
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
          top: "85%",
          right: "7%",
          transform: "translate(50%, -50%)",

          color: "white",
          padding: "10px 20px",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
        onClick={handleButtonClick1}
      >
        <img src={chatbot} alt="My Image" style={{ width: 40, height: 40 }} />
      </button>
      {showModal && (
        <div
          style={{
            position: "fixed",
            top: "65%",
            left: "93%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "5px",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
            zIndex: "999",
          }}
        >
          <h2>Modal Title</h2>
          <p>Modal Content</p>
          <button onClick={handleButtonClick2}>닫기</button>
        </div>
      )}
    </div>
  );
}

export default ChatbotModal;
