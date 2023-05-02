import "./style.css";
import React, { useRef } from "react";
import menuimg from "./image/more.png";

function ToggleMenu() {
  const toggleRef = useRef(null);
  const navbarRef = useRef(null);

  function closeNavbar(e) {
    if (
      document.body.classList.contains("show-nav") &&
      e.target !== toggleRef.current &&
      !toggleRef.current.contains(e.target) &&
      e.target !== navbarRef.current &&
      !navbarRef.current.contains(e.target)
    ) {
      document.body.classList.toggle("show-nav");
      document.body.removeEventListener("click", closeNavbar);
    } else if (!document.body.classList.contains("show-nav")) {
      document.body.removeEventListener("click", closeNavbar);
    }
  }

  // Toggle nav
  function handleToggleClick() {
    document.body.classList.toggle("show-nav");
    document.body.addEventListener("click", closeNavbar);
  }
  return (
    <>
      <button className="toggle" id="toggle" onClick={handleToggleClick} ref={toggleRef}>
        <img src={menuimg} alt="My Image" style={{ width: 30, height: 30 }} />
      </button>
      <nav id="navbar" ref={navbarRef}>
        <div className="togglecontent">
          <br /> <br />
          <a href="/" style={{ color: "white" }}>
            메인
          </a>
          <br /> <br />
          <a href="/freeBoard" style={{ color: "white" }}>
            자유게시판
          </a>
          <br /> <br />
          <a href="/qnalist" style={{ color: "white" }}>
            사용문의
          </a>
        </div>
      </nav>
    </>
  );
}

export default ToggleMenu;
