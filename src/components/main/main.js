import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";

import SimpleSlider from "./simpleSlider";
import Calendar from "./calendar";
import PartycardBtn from "./partycardBtn";
import Oursays from "./oursays";
import calendarimg from "./img/calendar.png";
import friends from "./img/friends.png";
import fight from "./img/fight.png";
import board from "./img/board.png";
import speech from "./img/speech-bubble.png";

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
        <img src={board} alt="noimg" style={{ height: "60px", width: "auto" }} /> &nbsp; &nbsp;&nbsp; &nbsp;
        <span style={{ fontSize: "1.5em" }}>이웃과 함께 당신의 관심사에 대해 이야기하세요</span> &nbsp; &nbsp;&nbsp; &nbsp;
        <img src={speech} alt="noimg" style={{ height: "60px", width: "auto" }} />
        <CategoryBtn />
        <Button variant="outline-info" size="sm">
          더보기
        </Button>
      </div>
      <img src={friends} alt="noimg" style={{ height: "70px", width: "auto" }} /> &nbsp; &nbsp;&nbsp; &nbsp;
      <span style={{ fontSize: "1.5em" }}>이웃과 함께 취미를 즐기세요!</span> &nbsp; &nbsp;&nbsp; &nbsp;
      <img src={fight} alt="noimg" style={{ height: "70px", width: "auto" }} />
      <div className="mainmiddle3">
        <div className="mainmiddle3-2">
          <PartycardBtn />
        </div>
        <Button variant="outline-secondary" size="sm">
          더보기
        </Button>
      </div>
      <img src={calendarimg} alt="noimg" style={{ height: "50px", width: "auto" }} /> &nbsp; &nbsp;&nbsp;
      <span style={{ fontSize: "1.5em" }}>일자를 클릭하고 가까운 이벤트를 확인하세요</span>
      <div className="mainmiddle2">
        <Calendar />
      </div>
      <div className="mainmiddle4">
        <Oursays />
      </div>
    </div>
  );
}

export default Main;
