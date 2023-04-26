import React, { useState, useRef } from 'react';
import ChatBot from 'react-simple-chatbot';
// npm install react-simple-chatbot
// 위에 거로 설치하다가 에러나면 아래거로 설치
// npm install react-simple-chatbot --save --legacy-peer-deps
import ChatbotModal from 'react-modal';
// npm install --save react-modal --legacy-peer-deps
import styled, { ThemeProvider } from 'styled-components';
// npm install styled-components
import botimg from '../image/bot.png';
import "./chatbot.css";

function Chatbot() {
    const [isModal, setModal] = useState(true);
    const toggleRef = useRef(null);
    const navbarRef = useRef(null);

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

    const Closebtn = styled.img`
        width: 35px;
        height: 35px;
        position: absolute;
        top: 3%;
        right: 3%;
        z-index: 1000;
        &:hover {
        cursor: pointer;
        }
    `

    const steps = [
        {
            id: '1',
            message: '안녕하세요.',
            trigger: '2',
        },
        {
            id: '2',
            message: '저는 우주탐방을 도와드릴 미리내입니다.',
            end: true,
        },
    ];

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

    return(
        <div>
            <button className='botToggle' ref={toggleRef}>
                <img src={botimg} alt="My Image" style={{ width: 30, height: 30 }} />
            </button>
        <ChatbotModal
            isOpen={isModal}
            onRequestClose={() => setModal(false)}
            ariaHideApp={false}
            shouldCloseOnOverlayClick={false}
            style={{
            content: {
                width: "320px",
                height: "500px",
                position: "relative",
                top: "200px",
                left: "1480px",
                display: "flex",
                overflow: "hidden",
                border: "medium none black",
                justifyContent: "center",
                flexWrap: "wrap",
                alignContent: "center",
                borderRadius: "20px",
                backgroundColor: "transparent",
            },
            }}
        >
            <Closebtn src='../images/close.jpg' onClick={() => setModal(false)} />
            <ThemeProvider theme={theme}>
                <ChatBot
                    steps={steps}
                    hideHeader={false}
                    headerTitle="테스트용"
                />
            </ThemeProvider>
        </ChatbotModal>
        </div>
    );
}

export default Chatbot;