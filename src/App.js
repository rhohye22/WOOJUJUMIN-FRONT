import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import ToggleMenu from "./components/togglemenu";
import Login from "./components/login";
import Main from "./components/main";
import KakaoHandler from "./components/social/kakaoHandler";

import AccountInfo from "./components/accountInfo";
import MessageInfo from "./components/messageInfo";
import SendMessageInfo from "./components/sendMessageInfo";

import MybbsList from "./components/mybbsList";
import MyfreebbsList from "./components/myfreebbsList";
import PartyAccept from "./components/partyAccept";
import PartyRoom from "./components/partyRoom";

import Regi from "./components/regi";

import FreeBbsList from "./components/freebbs/freeBbsList";
import FreeBbsDetail from "./components/freebbs/freeBbsDetail";
import FreeBbsWrite from "./components/freebbs/freeBbsWrite";
import FreeBbsModify from "./components/freebbs/freeBbsModify";
import FreeBbsDelete from "./components/freebbs/freeBbsDelete";
import FreeBbsReply from "./components/freebbs/freeBbsReply";
import FreeBbslikey from "./components/freebbs/freeBbslikey";

import Qnalist from "./components/qna/qnalist";
import Qnawrite from "./components/qna/qnawrite";
import Qnadetail from "./components/qna/qnadetail";

import "./App.css";

function App() {
  // 로그인 상태 관리
  const [log, setLog] = useState(null);
  const [nickname, setNickname] = useState("");

  function loghandle() {
    localStorage.clear();
    window.location.href = "/";
  }

  useEffect(() => {
    if (localStorage.getItem("login") === null) {
      setLog(true);
    } else {
      setLog(false);
      const loginInfo = JSON.parse(localStorage.getItem("login"));
      setNickname(loginInfo.nickname);
    }
  }, [log]);

  return (
    <div className="App">
      <BrowserRouter>
        <header>
          <ToggleMenu />
          <Link to="/">우주주민</Link>&nbsp;&nbsp;&nbsp;
          {log ? <span>로그인해주세요</span> : <span>{nickname}님</span>}&nbsp;&nbsp;&nbsp;
          {log ? <Link to="/regi">회원가입</Link> : <Link to="/accountInfo">마이페이지</Link>}&nbsp;&nbsp;&nbsp;
          {log === false && <Link to="/messageInfo">메시지함</Link>}&nbsp;&nbsp;&nbsp;
          {log ? <Link to="/login">로그인</Link> : <button onClick={loghandle}>로그아웃</button>}&nbsp;&nbsp;&nbsp;
        </header>

        <nav className="appNav">
          <Link to="/freeBoard">자유게시판</Link>&nbsp;&nbsp;&nbsp;
          <Link to="/qnalist">Q&A</Link>&nbsp;&nbsp;&nbsp;
        </nav>

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
            <Route path="/kakaoLogin" element={<KakaoHandler />} />
            <Route path="/accountInfo" element={<AccountInfo />}></Route>
            <Route path="/mybbsList" element={<MybbsList />}></Route>
            <Route path="/partyAccept" element={<PartyAccept />}></Route>
            <Route path="/partyRoom" element={<PartyRoom />}></Route>
            <Route path="/messageInfo" element={<MessageInfo />}></Route>
            <Route path="/sendMessageInfo" element={<SendMessageInfo />}></Route>
            <Route path="/myfreebbsList" element={<MyfreebbsList />}></Route>
            <Route path="/partyAccept" element={<PartyAccept />}></Route>
            <Route path="/partyRoom" element={<PartyRoom />}></Route>
            <Route path="regi" element={<Regi />} />
            <Route path="freeBoard" element={<FreeBbsList />} />
            <Route path="/freeBbsDetail/:bbsSeq" element={<FreeBbsDetail />} />
            <Route path="/freeBbsWrite" element={<FreeBbsWrite />} />
            <Route path="/freeBbsModify/:bbsSeq" element={<FreeBbsModify />} />
            <Route path="/freeBbsDelete/:bbsSeq" element={<FreeBbsDelete />} />
            <Route path="/freeBbsReply/:bbsSeq" element={<FreeBbsReply />} />
            <Route path="/freeBbslikey" element={<FreeBbslikey />} />
          </Routes>
        </main>
      </BrowserRouter>

      <footer>
        <p>여긴 푸터</p>
      </footer>
    </div>
  );
}

export default App;
