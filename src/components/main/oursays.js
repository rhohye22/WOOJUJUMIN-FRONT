import React, { Component } from "react";
import Slider from "react-slick";
import nhw from "./img/001.png";
import cmj from "./img/002.png";
import kyr from "./img/003.png";
import kgw from "./img/004.png";
import kjh from "./img/005.png";

import review from "./img/free-icon-rating-5250082.png";

import "./main.css";

function Oursays() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    cssEase: "linear",
  };
  return (
    <div>
      <img src={review} alt="noimg" style={{ height: "50px", width: "auto" }} /> &nbsp; &nbsp;&nbsp;
      <span style={{ fontSize: "1.5em" }}>우주인들의 후기</span>
      <br />
      <Slider {...settings}>
        <div className="saycard">
          <div className="incard">
            <img src={cmj} alt="noimg" style={{ height: "auto", width: "90%" }} />
          </div>
        </div>
        <div className="saycard">
          <div className="incard">
            <img src={kjh} alt="noimg" style={{ height: "auto", width: "90%" }} />
          </div>
        </div>
        <div className="saycard">
          <div className="incard">
            <img src={kyr} alt="noimg" style={{ height: "auto", width: "90%" }} />
          </div>
        </div>
        <div className="saycard">
          <div className="incard">
            <img src={kgw} alt="noimg" style={{ height: "auto", width: "90%" }} />
          </div>
        </div>
        <div className="saycard">
          <div className="incard">
            <img src={nhw} alt="noimg" style={{ height: "auto", width: "90%" }} />
          </div>
        </div>
      </Slider>
    </div>
  );
}
export default Oursays;
