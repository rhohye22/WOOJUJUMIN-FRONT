import React from "react";
import Carousel from "react-bootstrap/Carousel";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import coffee from "./coffee.png";
import festi from "./festi.png";
import station from "./station.png";
import space from "./space.jpg";

function SimpleSlider() {
  return (
    <Carousel slide={false} style={{ maxWidth: "1200px", maxHeight: "300px", margin: "auto" }}>
      <Carousel.Item>
        <img className="d-block w-100" src={station} alt="First slide" />
        <Carousel.Caption></Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100" src={festi} alt="Second slide" />
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100" src={coffee} alt="Third slide" />
      </Carousel.Item>{" "}
      <Carousel.Item>
        <img className="d-block w-100" src={space} alt="First slide" />
        <Carousel.Caption>
          <h1>우주안에선 우린 모두 이웃입니다</h1>
          <p>외로운 행성들을 모아봅시다</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default SimpleSlider;
