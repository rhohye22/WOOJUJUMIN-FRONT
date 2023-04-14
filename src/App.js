import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Login from "./components/login";
import Main from "./components/main";

import AccountInfo from "./components/accountInfo";
import MybbsList from "./components/mybbsList";
import PartyAccept from "./components/partyAccept";
import PartyRoom from "./components/partyRoom";

import Regi from "./components/regi";
import Free from "./components/freeBbs";


import "./App.css";

function App() {
  // 로그인 상태 관리
  const [log, setLog] = useState(null);

  function loghandle() {
      localStorage.clear();
      document.location.href = '/';
  }

  useEffect(() => {
      if(localStorage.getItem('login') === null) {
      setLog(true);
      }else {
      setLog(false);
      }
  }, [log])

  return (
    <div className="App">
      <BrowserRouter>
        <header>
          <Link to="/">우주주민</Link>&nbsp;&nbsp;&nbsp;
            <li>
              {log ?
                <Link to="/login">로그인</Link> :
                <button onClick={loghandle}>로그아웃</button>
              }
            </li>
            <li>
              {log ?
                <Link to="/regi">회원가입</Link> :
                <Link to="/accountInfo">마이페이지</Link>
              }
            </li>
        </header>
        <hr/>

        <nav>
          <h1>여기 네비바</h1>
          <li>
            <Link to="/free">자유게시판</Link>
          </li>
         
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

            <Route path="regi" element={<Regi />} />

            


            <Route path="free" element={<Free />}/>

        
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