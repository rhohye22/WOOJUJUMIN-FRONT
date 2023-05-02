import React, { useState, useEffect } from "react";

function BackToTopBtn() {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      if (currentScrollPos > 30) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleButtonClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div style={{ position: "relative" }}>
      {showButton && (
        <button
          style={{
            position: "fixed",
            bottom: "50px",
            right: "50px",

            color: "gray",
            padding: "10px 20px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            zIndex: "998",
          }}
          onClick={handleButtonClick}
        >
          Back to Top
        </button>
      )}
      <div style={{ height: "100%" }} />
    </div>
  );
}

export default BackToTopBtn;
