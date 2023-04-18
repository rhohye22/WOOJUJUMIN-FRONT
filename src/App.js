import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Login from "./components/login";
import Main from "./components/main";

import AccountInfo from "./components/accountInfo";
import MessageInfo from "./components/messageInfo";
import SendMessageInfo from "./components/sendMessageInfo";

import MybbsList from "./components/mybbsList";
import MyfreebbsList from "./components/myfreebbsList";
import PartyAccept from "./components/partyAccept";
import PartyRoom from "./components/partyRoom";

import Regi from "./components/regi";

import FreeBbsList from "./components/freeBbsList";
import FreeBbsDetail from "./components/freeBbsDetail";
import FreeBbsWrite from "./components/freeBbsWrite";
import FreeBbsModify from "./components/freeBbsModify";
import FreeBbsDelete from "./components/freeBbsDelete";

import Qnalist from "./components/qna/qnalist";
import Qnawrite from "./components/qna/qnawrite";
import Qnadetail from "./components/qna/qnadetail";

import "./App.css";

function App() {
  // 로그인 상태 관리
  const [log, setLog] = useState(null);

  function loghandle() {
    localStorage.clear();
    document.location.href = "/";
  }

  useEffect(() => {
    if (localStorage.getItem("login") === null) {
      setLog(true);
    } else {
      setLog(false);
    }
  }, [log]);

  return (
    <div className="App">
      <BrowserRouter>
        <header>
          <Link to="/">우주주민</Link>&nbsp;&nbsp;&nbsp;
          <li>
            {log ? (
              <Link to="/login">로그인</Link>
            ) : (
              <button onClick={loghandle}>로그아웃</button>
            )}
          </li>
          <li>
            {log ? (
              <Link to="/regi">회원가입</Link>
            ) : (
              <Link to="/accountInfo">마이페이지</Link>
            )}
          </li>
          <li>{log === false && <Link to="/messageInfo">메시지함</Link>}</li>
        </header>
        <hr />

        <nav>
          <h1>여기 네비바</h1>

          <li>
            {" "}
            <Link to="/freeBoard">자유게시판</Link>&nbsp;&nbsp;&nbsp;
            <Link to="/qnalist">Q&A</Link>&nbsp;&nbsp;&nbsp;
          </li>
        </nav>
        <hr />

        <main>
          <Routes>
            <Route exact path="/" element={<Main />} />
            <Route path="/login" element={<Login />} />
            <Route path="/regi" element={<Regi />} />
            // QNA
            <Route path="/qnalist" element={<Qnalist />} />
            <Route path="/qnawrite" element={<Qnawrite />} />
            <Route path="/qnadetail/:qnaSeq" exact element={<Qnadetail />} />
            //
            <Route path="/accountInfo" element={<AccountInfo />}></Route>
            <Route path="/mybbsList" element={<MybbsList />}></Route>
            <Route path="/partyAccept" element={<PartyAccept />}></Route>
            <Route path="/partyRoom" element={<PartyRoom />}></Route>
            <Route path="/messageInfo" element={<MessageInfo />}></Route>
            <Route
              path="/sendMessageInfo"
              element={<SendMessageInfo />}
            ></Route>
            <Route path="/myfreebbsList" element={<MyfreebbsList />}></Route>
            <Route path="/partyAccept" element={<PartyAccept />}></Route>
            <Route path="/partyRoom" element={<PartyRoom />}></Route>
            <Route path="regi" element={<Regi />} />
            <Route path="freeBoard" element={<FreeBbsList />} />
            <Route path="/freeBbsDetail/:bbsSeq" element={<FreeBbsDetail />} />
            <Route path="/freeBbsWrite" element={<FreeBbsWrite />} />
            <Route path="/freeBbsModify/:bbsSeq" element={<FreeBbsModify />} />
            <Route path="/freeBbsDelete/:bbsSeq" element={<FreeBbsDelete />} />
          </Routes>
        </main>
        <hr />
      </BrowserRouter>

      <footer>
        <h1>여긴 푸터</h1>
      </footer>
    </div>
  );
}

export default App;
