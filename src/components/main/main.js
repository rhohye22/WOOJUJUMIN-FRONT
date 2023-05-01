import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import SimpleSlider from "./simpleSlider";
import Calendar from "./calendar";
import CalendarList from "./calendarlist";
import calendarimg from "./img/calendar.png";

import "./main.css";

import CategoryBtn from "./categoryBtn";

function Main() {
  let { ryear, rmonth, ryyyymm } = useParams();

  if (typeof ryear === "undefined" || typeof rmonth === "undefined" || typeof ryyyymm === "undefined") {
    const currentDate = new Date();
    ryear = String(currentDate.getFullYear());
    // rmonth = new Date().getMonth() + 1;
    rmonth = String(currentDate.getMonth() + 1).padStart(2, "0");
    ryyyymm = ryear + rmonth;
  }

  return (
    <div className="mainpage">
      <div className="slider-container">
        <SimpleSlider />
      </div>
      <div className="mainmiddle1">
        <h2>이웃과 함께 관심사를 즐기세요</h2>
        <CategoryBtn />
        <button>더보기</button>
      </div>
      <img src={calendarimg} alt="noimg" style={{ height: "50px", width: "auto" }} /> &nbsp; &nbsp;&nbsp; &nbsp;&nbsp;
      <span style={{ fontSize: "2em" }}>일자를 클릭하고 가까운 이벤트를 확인하세요</span>
      <div className="mainmiddle2">
        <Calendar />
      </div>
      <div className="mainmiddle3"></div>
    </div>
  );
}

export default Main;
