import React, { useState } from "react";
import chatbot from "./image/free-icon-chatbot-6819697.png";
import ChatBot from 'react-simple-chatbot';
// npm install react-simple-chatbot --save
// 위에 거로 설치하다가 에러나면 아래거로 설치
// npm install react-simple-chatbot --save --legacy-peer-deps
import { ThemeProvider } from 'styled-components';
// npm install styled-components
import { Link } from "react-router-dom";
import Ans from "./chatbot/chatbot";

function ChatbotModal() {
  const [showModal, setShowModal] = useState(false);

  const handleButtonClick1 = () => {
    setShowModal(true);
  };
  const handleButtonClick2 = () => {
    setShowModal(false);
  };

  // 챗봇의 테마
  const theme = {
    background: '#f5f8fb',
    fontFamily: 'Helvetica Neue',
    headerBgColor: '#9400D3',
    headerFontColor: '#fff',
    headerFontSize: '15px',
    botBubbleColor: '#EF6C00',
    botFontColor: '#fff',
    userBubbleColor: '#fff',
    userFontColor: '#4a4a4a',
  };

  // 챗봇의 내용
  const steps = [
    {
        id: '1',
        message: '안녕하세요.',
        trigger: '2'
    },
    {
        id: '2',
        message: '저는 우주탐방을 도와드릴 미리내입니다.',
        trigger: '200'
    },
    {
      id: '200',
      user: true,
      trigger: '201'
    },
    {
      id: '201',
      component: <Ans />,
      asMessage: true,
      trigger: '3'
    },
    {
      id: '3',
      message: '어떤 도움이 필요하신가요?',
      trigger: '4'
    },
    {
      id: '4',
      options: [
        { value: 1, label: '여긴 어떤 곳?', trigger: '소개_1' },
        { value: 2, label: '어떻게 활동할 수 있지?', trigger: '소개_3' },
        { value: 3, label: '안내 종료', trigger: '종료' }
      ]
    },
    {
      id: '소개_1',
      message: '우주주민은 동네 주민들이 모여서 다양한 활동을 할 수 있는 공간입니다.',
      trigger: '소개_2'
    },
    {
      id: '소개_2',
      message: '우리 동네를 등록하고 주민을 만나보세요!',
      trigger: '회원가입'
    },
    {
      id: '회원가입',
      component: <Link to="/regi">회원가입</Link>,
      asMessage: true,
      trigger: '추가 질문'
    },
    {
      id: '추가 질문',
      message: '더 궁금한 것이 있습니까?',
      trigger: '4'
    },
    {
      id: '소개_3',
      message: '크게 자유게시판과 모집게시판으로 나뉘어 있습니다.',
      trigger: '게시판'
    },
    {
      id: '게시판',
      options: [
        { value: 1, label: '자유게시판', trigger: '자유게시판' },
        { value: 2, label: '모집게시판', trigger: '모집게시판' },
        { value: 3, label: '돌아가기', trigger: '추가 질문' }
      ]
    },
    {
      id: '자유게시판',
      component: <Link to="/freeBoard">자유게시판</Link>,
      asMessage: true,
      trigger: '자유게시판_2'
    },
    {
      id: '자유게시판_2',
      message: '자유게시판은 일반적인 커뮤니티 공간입니다. 원하시는 게시글을 작성하거나 읽을 수 있습니다.',
      trigger: '게시판_2'
    },
    {
      id: '게시판_2',
      options: [
        { value: 1, label: '모집게시판', trigger: '모집게시판' },
        { value: 2, label: '돌아가기', trigger: '추가 질문' }
      ]
    },
    {
      id: '모집게시판',
      message: '모집게시판은 어떤 활동이든 같이 할 파티를 만드는 공간입니다. 마음에 드시는 활동에 참여하거나 직접 만드실 수 있습니다.',
      trigger: '게시판_3'
    },
    {
      id: '게시판_3',
      options: [
        { value: 1, label: '자유게시판', trigger: '자유게시판' },
        { value: 2, label: '어떤 활동들이 주로 있어?', trigger: '카테고리' },
        { value: 3, label: '돌아가기', trigger: '추가 질문' }
      ]
    },
    {
      id: '카테고리',
      message: '현재 축구, 농구, 야구, 예능, 드라마/영화, 게임, 음식, 우주주민 함께, 우주주민 탐사, 잡담으로 구분되어 있습니다.',
      trigger: '게시판_4'
    },
    {
      id: '게시판_4',
      options: [
        { value: 1, label: '자유게시판', trigger: '자유게시판' },
        { value: 2, label: '돌아가기', trigger: '추가 질문' }
      ]
    },
    {
      id: '종료',
      message: '안내를 종료합니다.',
      end: true
    }
  ];

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
            top: "60%",
            left: "87%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "5px",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
            zIndex: "999",
          }}
        >
          <ThemeProvider theme={theme}>
            <ChatBot
                steps={steps}
                hideHeader={false}
                headerTitle="미리내"
            />
            </ThemeProvider>
            <br/>
          <button onClick={handleButtonClick2}>닫기</button>
        </div>
      )}
    </div>
  );
}

export default ChatbotModal;
