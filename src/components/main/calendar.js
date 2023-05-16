import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams, Routes, Route } from "react-router-dom";
/* import Ink from "../image/ink.png"; */
import CalendarList from "./calendarlist";
import Table from "react-bootstrap/Table";
import backyear from "./img/backyear.png";
import nextyear from "./img/nextyear.png";
import nextmonth from "./img/nextmonth.png";
import backmonth from "./img/backmonth.png";

function Calendar() {
  let { ryear, rmonth, ryyyymm } = useParams();

  function nvl(msg) {
    return msg === null ? true : false;
  }

  if (nvl(ryear) || nvl(rmonth) || nvl(ryyyymm)) {
    const currentDate = new Date();
    ryear = String(currentDate.getFullYear());
    // rmonth = new Date().getMonth() + 1;
    rmonth = String(currentDate.getMonth() + 1).padStart(2, "0");
    const currentDay = String(currentDate.getDate()).padStart(2, "0");
    ryyyymm = rmonth + currentDay;
  }
  /* 
  console.log(ryear);
  console.log(rmonth);
  console.log(ryyyymm); */
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [sendYear, setSendYear] = useState(ryear);
  const [sendMonth, setSendMonth] = useState(rmonth);
  const [dayOfWeek, setDayOfWeek] = useState(0);
  const [lastday, setLastday] = useState(0);
  const [weekday, setWeekday] = useState(0);
  const [yyyymm, setYyyymm] = useState("");
  const [sendyyyymm, setSendyyymm] = useState(ryyyymm);
  const [calendardto, setCalendardto] = useState([]);

  useEffect(() => {
    const fetchData = async (sendYear, sendMonth) => {
      await axios
        .post("http://118.67.132.98:3000/calendarmain", null, { params: { sendYear: sendYear, sendMonth: sendMonth, sendYyyymm: sendyyyymm } })
        .then(function(res) {
          setDayOfWeek(res.data.dayOfWeek);
          setLastday(res.data.lastday);
          setWeekday(res.data.weekday);
          setYear(res.data.year);

          setMonth(charTwo(res.data.month));

          setYyyymm(res.data.year + charTwo(res.data.month));
          setCalendardto(res.data.list);
        })
        .catch(function(err) {
          alert(err);
        });
    };

    fetchData(sendYear, sendMonth);
  }, [sendMonth, sendYear, sendyyyymm]);

  const [listcnt, setListcnt] = useState([]);

  useEffect(() => {
    async function cntData() {
      try {
        const updatedListcnt = []; // 업데이트된 배열을 임시로 저장할 변수
        for (let i = 1; i <= lastday; i++) {
          let ymd = year + charTwo(month) + charTwo(i);
          const response = await axios.get("http://118.67.132.98:3000/listcount", { params: { rdate: ymd } });
          console.log(response.data);
          updatedListcnt.push(response.data);
        }
        setListcnt(updatedListcnt); // 배열 상태 업데이트
      } catch (error) {
        alert(error);
      }
    }
    cntData();
    console.log("배열확인용", listcnt); // 배열이 업데이트될 때마다 호출
  }, [lastday]);

  // 전년도
  function prevYear() {
    // alert(year);
    // alert(month);
    setSendYear(year - 1);
    setSendMonth(Number(month));
    let intToString = String(year - 1) + charTwo(Number(month));
    setSendyyymm(intToString);
  }

  // 전월
  function prevMonth() {
    setSendYear(year);
    setSendMonth(Number(month) - 1);
    let intToString = String(year) + charTwo(Number(month) - 1);
    setSendyyymm(intToString);
  }

  // 익월
  function nextMonth() {
    setSendYear(year);
    setSendMonth(Number(month) + 1);
    let intToString = String(year) + charTwo(Number(month) + 1);
    setSendyyymm(intToString);
  }

  // 내년도
  function nextYear() {
    setSendYear(year + 1);
    setSendMonth(Number(month));
    let intToString = String(year + 1) + charTwo(Number(month));
    setSendyyymm(intToString);
  }

  // 오늘날짜로 돌아오기
  function todaySet() {
    setSendYear("");
    setSendMonth("");
    setSendyyymm("");
  }

  // 한자리 숫자를 두자리로 만들어주는 함수 : 1 ~ 9 -> 01 ~ 09
  function charTwo(msg) {
    if (typeof msg !== "string") {
      msg = String(msg); // 숫자나 다른 타입을 문자열로 변환
    }

    return msg.length < 2 ? "0" + msg : msg;
  }

  // 제목 길면 ... 으로 변경해주는 함수
  function dot3(msg) {
    let str = "";
    if (msg.length >= 10) {
      str = msg.substring(0, 6); //0 부터 10 전까지  - 6으로 바꿈
      str += "...";
    } else {
      str = msg;
    }
    return str;
  }

  // 의존성 배열로 경고나서 useEffect안에 함수 정의 함수 불러오기 수정
  // useEffect(() => {
  //     fetchData(sendYear, sendMonth);
  // }, [sendMonth, sendYear, sendyyyymm]);
  const [clickedDate, setClickedDate] = useState(null);

  const handleClick = (day) => {
    setClickedDate(day);
  };

  // 달력 가져오기
  const calendarList = () => {
    let arrTop = [];
    let row = [];

    // 내가 이동한 월 가져오기
    const today = new Date(year, month - 1);
    console.log(today);

    // 현재 월의 첫 날 설정
    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

    // 전월의 첫 날 설정
    const firstDayOfPrevMonth = new Date(firstDayOfMonth.getFullYear(), firstDayOfMonth.getMonth() - 1, 1);

    // 전월의 마지막 날 가져오기
    const lastDayOfPrevMonth = new Date(firstDayOfPrevMonth.getFullYear(), firstDayOfPrevMonth.getMonth() + 1, 0);

    console.log(lastDayOfPrevMonth.getDate()); // 전월의 마지막 날짜 출력

    // 위쪽 빈칸
    for (let i = 1; i < dayOfWeek; i++) {
      row.push(
        <td key={i} style={{ border: "1px solid #e2e2e2", color: "#808080", verticalAlign: "top" }}>
          {lastDayOfPrevMonth.getDate() - dayOfWeek + i + 1}
        </td>
      );
    }

    // 날짜
    // `/some-url?month=${monthValue}&day=${dayValue}`
    for (let i = 1; i <= lastday; i++) {
      const tableList = calendardto.map((cal, index) => {
        let selDate = year + charTwo(month) + charTwo(i);

        return cal.rdate.substring(0, 8) === selDate
          ? /*  ( // 값이 true일 때 테이블을 출력하도록 설정
          <div style={{ overflowY: "20px" }}>
            <table key={index}>
              <tbody>
                <tr>
                  <td>
                    [{cal.tagName}]{dot3(cal.title)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        ) */ null
          : null; // 속성이 false일 경우, null을 반환하여 아무것도 출력하지 않도록 설정
      });

      row.push(
        <td key={i + dayOfWeek - 1} style={{ border: "1px solid #e2e2e2", height: "55px" }}>
          <div key={i} onClick={() => handleClick(i)} style={{ backgroundColor: clickedDate === i ? "#ECC5FB" : "" }}>
            <Link to={`/${year}${month}${charTwo(i)}`} style={{ textDecoration: "none" }}>
              {i}일
            </Link>
            <b style={{ textAlign: "right", float: "right", fontSize: "13px" }}>{listcnt[i - 1]}</b>
          </div>
          {tableList}
        </td>
      );
      if ((i + dayOfWeek - 1) % 7 === 0 && i !== lastday) {
        arrTop.push(
          <tr key={i} style={{ height: "50px", textAlign: "left", verticalAlign: "top" }}>
            {row}
          </tr>
        );
        row = [];
      }
    }

    // 아래쪽 빈칸
    for (let i = 0; i < 7 - weekday; i++) {
      row.push(
        <td key={i} style={{ border: "1px solid #e2e2e2", color: "#808080", verticalAlign: "top" }}>
          {i + 1}
        </td>
      );
    }
    let keyVal = 0;
    arrTop.push(
      <tr key={keyVal} style={{ height: "50px", textAlign: "left", verticalAlign: "top" }}>
        {row}
      </tr>
    );

    return <>{arrTop}</>;
  };

  return (
    <>
      <div className="mainmiddle2-1">
        <div style={{ alignItems: "center" }}>
          <img src={backyear} onClick={prevYear} alt="전년도" style={{ height: "40px", width: "auto" }} /> &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;
          <img src={backmonth} onClick={prevMonth} alt="전월" style={{ height: "40px", width: "auto" }} /> &nbsp; &nbsp;&nbsp; &nbsp;
          <b>
            {year}년 {month}월&nbsp; &nbsp;&nbsp; &nbsp;
          </b>
          <img src={nextmonth} onClick={nextMonth} alt="익월" style={{ height: "40px", width: "auto" }} /> &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;
          <img src={nextyear} onClick={nextYear} alt="내년도" style={{ height: "40px", width: "auto" }} />
        </div>
        <div>
          <Table responsive hover>
            <thead>
              <tr>
                <th>일</th>
                <th>월</th>
                <th>화</th>
                <th>수</th>
                <th>목</th>
                <th>금</th>
                <th>토</th>
              </tr>
            </thead>
            <tbody>{calendarList()}</tbody>
          </Table>
        </div>
      </div>
      <div className="mainmiddle2-2">
        <Routes>
          <Route path="/:rdate" element={<CalendarList />} />
        </Routes>
      </div>
    </>
  );
}

export default Calendar;
