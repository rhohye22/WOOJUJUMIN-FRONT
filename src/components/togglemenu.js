import "./style.css";
import React, { useRef } from "react";
import { BrowserRouter, Routes, Route, Link, useNavigate, useLocation } from "react-router-dom";
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
          <ul className="nav-menu">
            <li>
              <Link to="/">메인페이지</Link>
            </li>

            <li>
              <Link to="/freeBoard">자유게시판</Link>
            </li>

            <li>
              <Link to="/qnalist">사용문의</Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}

export default ToggleMenu;
