import React from "react";
import Carousel from "react-bootstrap/Carousel";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import sliderimg1 from "./duy-pham-Cecb0_8Hx-o-unsplash.jpg";
import sliderimg2 from "./chang-duong-Sj0iMtq_Z4w-unsplash.jpg";
import sliderimg3 from "./j-king-ebuixpviQH0-unsplash.jpg";

function SimpleSlider() {
  return (
    <Carousel slide={false} style={{ maxWidth: "1200px", margin: "auto" }}>
      <Carousel.Item>
        <img className="d-block w-100" src={sliderimg1} alt="First slide" />
        <Carousel.Caption>
          <h3>우주주민에서 회원들과 실시간 채팅을!!!!</h3>
          <p>개인정보의 교환없이도 주민들과 1대1 채팅이 가능합니다!!</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100" src={sliderimg2} alt="Second slide" />

        <Carousel.Caption>
          <h3>난 혼자 산다! 그러나 함게 살아간다</h3>
          <p>이웃들과의 교류를 적극 지원합니다</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100" src={sliderimg3} alt="Third slide" />

        <Carousel.Caption>
          <h3>같이 놀사람 여기 붙어라!</h3>
          <p>혹시 ㅇㅇ 좋아하세요..?그럼...</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default SimpleSlider;
