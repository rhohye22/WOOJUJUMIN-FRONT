import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Login from "./components/login";
import Main from "./components/main";

import "./App.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <header>
          <Link to="/">우주주민</Link>
        </header>
        <hr/>

        <nav>
          <h1>여기 네비바</h1>
          <Link to="/login">Login</Link> &nbsp;&nbsp;
         
        </nav>
        <hr/>

        <main>
          <h1>여기 메인</h1>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/login" element={<Login />} />
            
            
        
          </Routes>
        </main>
        <hr/>
      </BrowserRouter>

      <footer>
        <h1>여긴 푸터</h1>
      </footer>
    </div>
  );
}

export default App;