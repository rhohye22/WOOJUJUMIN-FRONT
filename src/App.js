import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Login from "./components/login";
import Main from "./components/main";
import AccountInfo from "./components/accountInfo";
import MybbsList from "./components/mybbsList";
import PartyAccept from "./components/partyAccept";
import PartyRoom from "./components/partyRoom";

import "./App.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <header>
          <Link to="/">우주주민</Link>&nbsp;&nbsp;&nbsp;
          <Link to="/accountInfo">마이페이지</Link>
        </header>
        <hr/>

        <nav>
          <h1>여기 네비바</h1>
          <Link to="/login">Login</Link> &nbsp;&nbsp;
         
        </nav>
        <hr/>

        <main>
        
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/login" element={<Login />} />
            
            <Route path="/accountInfo" element={<AccountInfo/>}></Route>
            <Route path="/mybbsList" element={<MybbsList/>}></Route>
            <Route path="/partyAccept" element={<PartyAccept/>}></Route>
            <Route path="/partyRoom" element={<PartyRoom/>}></Route>
        
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