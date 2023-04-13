import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Login from "./components/login";
import Main from "./components/main";
import Regi from "./components/regi";
import Qnalist from "./components/qna/qnalist";
import Qnawrite from "./components/qna/qnawrite";

import "./App.css";

function App() {
  function logout() {
    localStorage.clear();
  }
  return (
    <div className="App">
      <BrowserRouter>
        <header>
          <Link to="/">우주주민</Link>
          <li>
            <Link to="/login">로그인</Link>
          </li>
          <li>
            <Link to="/regi">회원가입</Link>
          </li>
        </header>
        <hr />

        <nav>
          <h1>여기 네비바</h1>
          <Link to="/qnalist">Q&A</Link>
        </nav>
        <hr />

        <main>
          <h1>여기 메인</h1>
          <Routes>
            <Route exact path="/" element={<Main />} />
            <Route path="/login" element={<Login />} />
            <Route path="/regi" element={<Regi />} />
            // QNA
            <Route path="/qnalist" element={<Qnalist />} />
            <Route path="/qnawrite" element={<Qnawrite />} />
            //
          </Routes>
        </main>
        <hr />
      </BrowserRouter>

      <footer>
        <h1>여긴 푸터</h1>
        <br />
        <button onClick={() => logout()}>logout</button>&nbsp;
      </footer>
    </div>
  );
}

export default App;
