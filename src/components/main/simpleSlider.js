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
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100" src={sliderimg2} alt="Second slide" />

        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100" src={sliderimg3} alt="Third slide" />

        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default SimpleSlider;
