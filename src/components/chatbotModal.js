import React, { useEffect, useState } from "react";
import chatbot from "./image/free-icon-chatbot-6819697.png";
import ChatBot from "react-simple-chatbot";
// npm install react-simple-chatbot --save
// 위에 거로 설치하다가 에러나면 아래거로 설치
// npm install react-simple-chatbot --save --legacy-peer-deps
import { ThemeProvider } from "styled-components";
// npm install styled-components
import { Link } from "react-router-dom";
import Ans from "./chatbot/chatbot";

function ChatbotModal() {
  const [profile, setProfile] = useState('');

  // login 되어 있는지 검사
  useEffect(() => {
    let login = JSON.parse(localStorage.getItem("login"));
    if (login === null || login === undefined) {
      setProfile('basic.png');
    } else {
      // 빈칸이 아닐때
      setProfile(login.profile);
      //console.log(profile);
    }
  }, []);

  const [showModal, setShowModal] = useState(false);

  const handleButtonClick1 = () => {
    setShowModal(true);
  };
  const handleButtonClick2 = () => {
    setShowModal(false);
  };

  // 챗봇의 테마
  const theme = {
    background: "#f5f8fb",
    fontFamily: "Helvetica Neue",
    headerBgColor: "#9400D3",
    headerFontColor: "#fff",
    headerFontSize: "15px",
    botBubbleColor: "#EF6C00",
    botFontColor: "#fff",
    userBubbleColor: "#fff",
    userFontColor: "#4a4a4a",
  };

  // 챗봇의 내용
  const steps = [
    {
      id: "1",
      message: "안녕하세요.",
      trigger: "2",
    },
    {
      id: "2",
      message: "저는 우주탐방을 도와드릴 미리내입니다.",
      trigger: "선택",
    },
    {
      id: "선택",
      message: "대화에 더 편하신 방식을 선택해주세요.",
      trigger: "선택_1",
    },
    {
      id: "선택_1",
      options: [
        { value: 1, label: "선택지 제공", trigger: "4" },
        { value: 2, label: "직접 대화", trigger: "대화_1" },
        { value: 3, label: "안내 종료", trigger: "종료" },
      ],
    },
    {
      id: "대화_1",
      message: "필요하신 것을 말씀해주세요!",
      trigger: "200",
    },
    {
      id: "200",
      user: true,
      trigger: "201",
    },
    {
      id: "201",
      component: <Ans />,
      asMessage: true,
      trigger: "3",
    },
    {
      id: "3",
      message: "어떤 도움이 필요하신가요?",
      trigger: "200",
    },
    {
      id: "202",
      message: "사용법이 궁금하실 경우 언제든지 말씀주세요.",
      trigger: "200",
    },
    {
      id: "소개_101",
      message: "자유게시판을 통해 자유롭게 글을 작성할 수 있으며, 사람들과 어울리고 싶을 경우 파티게시판을 이용하실 수 있습니다.",
      trigger: "200",
    },
    {
      id: "게시판_101",
      message: "둘 중 어떤 게시판이 궁금하신가요?.",
      trigger: "200",
    },
    {
      id: "자유게시판_101",
      component: <Link to="/freeBoard">자유게시판</Link>,
      asMessage: true,
      trigger: "200",
    },
    {
      id: "파티게시판_101",
      component: <Link to="/partybbslist">파티게시판</Link>,
      asMessage: true,
      trigger: "200",
    },
    {
      id: "로그인여부",
      message: '파티게시판은 로그인 후에 이용하실 수 있습니다.',
      trigger: "로그인페이지",
    },
    {
      id: "로그인페이지",
      component: <Link to="/login">로그인</Link>,
      asMessage: true,
      trigger: "200",
    },
    {
      id: "가입_1",
      component: <Link to="/regi">회원가입</Link>,
      asMessage: true,
      trigger: "200",
    },
    {
      id: "문화생활_101",
      message: "어떤 부분이 제일 궁금하세요?",
      trigger: "200",
    },
    {
      id: "영화_101",
      component: <Link to="/moviechart">상영영화</Link>,
      asMessage: true,
      trigger: "200",
    },
    {
      id: "독서_101",
      component: <Link to="/bookchart">책베스트</Link>,
      asMessage: true,
      trigger: "200",
    },
    {
      id: "축제_101",
      component: <Link to="/localevent">지역축제</Link>,
      asMessage: true,
      trigger: "200",
    },
    {
      id: "음악_101",
      component: <Link to="/musichart">TOP50</Link>,
      asMessage: true,
      trigger: "200",
    },
    {
      id: "설정밖",
      message: "복잡하신 질문은 문의사항을 이용하실 수 있습니다.",
      trigger: "문의_1",
    },
    {
      id: "문의_1",
      component: <Link to="/qnalist">사용문의</Link>,
      asMessage: true,
      trigger: "설정밖_1",
    },
    {
      id: "설정밖_1",
      message: "대화 형식을 변경하실 수도 있습니다.",
      trigger: "선택_1",
    },
    {
      id: "4",
      options: [
        { value: 1, label: "여긴 어떤 곳?", trigger: "소개_1" },
        { value: 2, label: "어떻게 활동할 수 있지?", trigger: "소개_3" },
        { value: 3, label: "관리자에게 연결해줘", trigger: "관리자_1" },
        { value: 4, label: "다양한 문화 소개", trigger: "문화생활_1" },
        { value: 5, label: "직접 대화", trigger: "대화_1" },
        { value: 6, label: "안내 종료", trigger: "종료" },
      ],
    },
    {
      id: "문화생활_1",
      message: "문화생활은 영화, 독서, 축제, 음악으로 나뉩니다.",
      trigger: "문화생활_2",
    },
    {
      id: "문화생활_2",
      options: [
        { value: 1, label: "영화", trigger: "영화_1" },
        { value: 2, label: "독서", trigger: "독서_1" },
        { value: 3, label: "축제", trigger: "축제_1" },
        { value: 4, label: "음악", trigger: "음악_1" },
        { value: 5, label: "돌아가기", trigger: "추가 질문" },
      ],
    },
    {
      id: "영화_1",
      message: "현재 상영되는 영화의 예매율, 개봉일자 등의 정보를 알 수 있습니다.",
      trigger: "영화_2",
    },
    {
      id: "영화_2",
      component: <Link to="/moviechart">상영영화</Link>,
      asMessage: true,
      trigger: "영화_3",
    },
    {
      id: "영화_3",
      options: [
        { value: 1, label: "독서", trigger: "독서_1" },
        { value: 2, label: "축제", trigger: "축제_1" },
        { value: 3, label: "음악", trigger: "음악_1" },
        { value: 4, label: "돌아가기", trigger: "추가 질문" },
      ],
    },
    {
      id: "독서_1",
      message: "알라딘에서 판매되는 책의 정보를 알 수 있습니다.",
      trigger: "독서_2",
    },
    {
      id: "독서_2",
      component: <Link to="/bookchart">책베스트</Link>,
      asMessage: true,
      trigger: "독서_3",
    },
    {
      id: "독서_3",
      options: [
        { value: 1, label: "영화", trigger: "영화_1" },
        { value: 2, label: "축제", trigger: "축제_1" },
        { value: 3, label: "음악", trigger: "음악_1" },
        { value: 4, label: "돌아가기", trigger: "추가 질문" },
      ],
    },
    {
      id: "축제_1",
      message: "전국에서 진행되는 축제에 대한 정보를 확인할 수 있습니다.",
      trigger: "축제_2",
    },
    {
      id: "축제_2",
      component: <Link to="/localevent">지역축제</Link>,
      asMessage: true,
      trigger: "축제_3",
    },
    {
      id: "축제_3",
      options: [
        { value: 1, label: "영화", trigger: "영화_1" },
        { value: 2, label: "독서", trigger: "독서_1" },
        { value: 3, label: "음악", trigger: "음악_1" },
        { value: 4, label: "돌아가기", trigger: "추가 질문" },
      ],
    },
    {
      id: "음악_1",
      message: "현재 멜론차트 상위 50위까지의 음악을 확인할 수 있습니다.",
      trigger: "음악_2",
    },
    {
      id: "음악_2",
      component: <Link to="/musichart">TOP50</Link>,
      asMessage: true,
      trigger: "음악_3",
    },
    {
      id: "음악_3",
      options: [
        { value: 1, label: "영화", trigger: "영화_1" },
        { value: 2, label: "독서", trigger: "독서_1" },
        { value: 3, label: "축제", trigger: "축제_1" },
        { value: 4, label: "돌아가기", trigger: "추가 질문" },
      ],
    },
    {
      id: "관리자_1",
      message: "문의를 통해 관리자에게 요청이나 질문을 남길 수 있습니다.",
      trigger: "관리자_2",
    },
    {
      id: "관리자_2",
      component: <Link to="/qnalist">사용문의</Link>,
      asMessage: true,
      trigger: "추가 질문",
    },
    {
      id: "소개_1",
      message: "우주주민은 동네 주민들이 모여서 다양한 활동을 할 수 있는 공간입니다.",
      trigger: "소개_2",
    },
    {
      id: "소개_2",
      message: "우리 동네를 등록하고 주민을 만나보세요!",
      trigger: "회원가입",
    },
    {
      id: "회원가입",
      component: <Link to="/regi">회원가입</Link>,
      asMessage: true,
      trigger: "추가 질문",
    },
    {
      id: "추가 질문",
      message: "더 궁금한 것이 있습니까?",
      trigger: "4",
    },
    {
      id: "소개_3",
      message: "크게 자유게시판과 파티게시판으로 나뉘어 있습니다.",
      trigger: "게시판",
    },
    {
      id: "게시판",
      options: [
        { value: 1, label: "자유게시판", trigger: "자유게시판" },
        { value: 2, label: "파티게시판", trigger: "모집게시판" },
        { value: 3, label: "돌아가기", trigger: "추가 질문" },
      ],
    },
    {
      id: "자유게시판",
      component: <Link to="/freeBoard">자유게시판</Link>,
      asMessage: true,
      trigger: "자유게시판_2",
    },
    {
      id: "자유게시판_2",
      message: "자유게시판은 일반적인 커뮤니티 공간입니다. 원하시는 게시글을 작성하거나 읽을 수 있습니다.",
      trigger: "게시판_2",
    },
    {
      id: "게시판_2",
      options: [
        { value: 1, label: "파티게시판", trigger: "모집게시판" },
        { value: 2, label: "돌아가기", trigger: "추가 질문" },
      ],
    },
    {
      id: "모집게시판",
      component: <Link to="/partybbslist">파티게시판</Link>,
      asMessage: true,
      trigger: "모집게시판_2",
    },
    {
      id: "모집게시판_2",
      message: "파티게시판은 어떤 활동이든 같이 할 파티를 만드는 공간입니다. 마음에 드시는 활동에 참여하거나 직접 만드실 수 있습니다.",
      trigger: "게시판_3",
    },
    {
      id: "게시판_3",
      options: [
        { value: 1, label: "자유게시판", trigger: "자유게시판" },
        { value: 2, label: "어떤 활동들이 주로 있어?", trigger: "카테고리" },
        { value: 3, label: "돌아가기", trigger: "추가 질문" },
      ],
    },
    {
      id: "카테고리",
      message: "테마는 축구, 농구, 야구, 예능, 드라마/영화, 게임, 음식, 우주주민 함께, 우주주민 탐사, 잡담으로 구분되어 있습니다.",
      trigger: "게시판_4",
    },
    {
      id: "게시판_4",
      options: [
        { value: 1, label: "자유게시판", trigger: "자유게시판" },
        { value: 2, label: "돌아가기", trigger: "추가 질문" },
      ],
    },
    {
      id: "종료",
      message: "안내를 종료합니다.",
      end: true,
    },
  ];

  return (
    <div style={{ position: "relative" }}>
      <button
        style={{
          position: "fixed",
          top: "80%",
          right: "7%",
          transform: "translate(50%, -50%)",

          color: "white",
          padding: "10px 20px",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          zIndex: "999",
        }}
        onClick={handleButtonClick1}
      >
        <img src={chatbot} alt="My Chatbot" style={{ width: 60, height: 60 }} />
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
            <ChatBot recognitionEnable={true} recognitionLang='ko'
              steps={steps} hideHeader={false} headerTitle="미리내"
              userAvatar={`http://118.67.132.98:3000/upload/member/${profile}`} botAvatar={chatbot} />
          </ThemeProvider>
          <br />
          <button onClick={handleButtonClick2}>닫기</button>
        </div>
      )}
    </div>
  );
}

export default ChatbotModal;
