import React, { useState } from "react";
import basketball from "./img/basketball.png";
import basketballGif from "./img/basketball.gif";
import ball from "./img/ball.png";
import ballGif from "./img/ball.gif";
import baseball from "./img/baseball.png";
import baseballGif from "./img/baseball.gif";
import game from "./img/game-controller.png";
import gameGif from "./img/game-controller.gif";
import tv from "./img/tv.png";
import tvGif from "./img/tv.gif";
import film from "./img/film-tape.png";
import filmGif from "./img/film-tape.gif";
import burger from "./img/burger.png";
import burgerGif from "./img/burger.gif";
import friends from "./img/three-friends.png";
import friendsGif from "./img/three-friends.gif";

function CategoryBtn() {
  const [isBasketballHovered, setIsBasketballHovered] = useState(false);
  const [isBallHovered, setIsBallHovered] = useState(false);
  const [isbaseballHovered, setIsbaseballHovered] = useState(false);
  const [isgameHovered, setIsgameHovered] = useState(false);
  const [istvHovered, setIstvHovered] = useState(false);
  const [isfilmHovered, setIsfilmHovered] = useState(false);
  const [isburgerHovered, setIsburgerHovered] = useState(false);
  const [isfriendsHovered, setIsfriendsHovered] = useState(false);

  const handleBasketballMouseOver = () => {
    setIsBasketballHovered(true);
  };

  const handleBasketballMouseOut = () => {
    setIsBasketballHovered(false);
  };

  const handleBallMouseOver = () => {
    setIsBallHovered(true);
  };

  const handleBallMouseOut = () => {
    setIsBallHovered(false);
  };

  const handlebaseballMouseOver = () => {
    setIsbaseballHovered(true);
  };

  const handlebaseballMouseOut = () => {
    setIsbaseballHovered(false);
  };
  const handlegameMouseOver = () => {
    setIsgameHovered(true);
  };

  const handlegameMouseOut = () => {
    setIsgameHovered(false);
  };
  const handletvMouseOver = () => {
    setIstvHovered(true);
  };

  const handletvMouseOut = () => {
    setIstvHovered(false);
  };
  const handlefilmMouseOver = () => {
    setIsfilmHovered(true);
  };

  const handlefilmMouseOut = () => {
    setIsfilmHovered(false);
  };
  const handleburgerMouseOver = () => {
    setIsburgerHovered(true);
  };

  const handleburgerMouseOut = () => {
    setIsburgerHovered(false);
  };
  const handlefriendsMouseOver = () => {
    setIsfriendsHovered(true);
  };

  const handlefriendsMouseOut = () => {
    setIsfriendsHovered(false);
  };

  return (
    <div className="mainmiddle1-1">
      <div>
        <img
          src={isBasketballHovered ? basketballGif : basketball}
          alt="basketball"
          style={{ width: "70px", height: "auto" }}
          onMouseOver={handleBasketballMouseOver}
          onMouseOut={handleBasketballMouseOut}
        />
        농구
      </div>
      <div>
        <img src={isBallHovered ? ballGif : ball} alt="ball" style={{ width: "70px", height: "auto" }} onMouseOver={handleBallMouseOver} onMouseOut={handleBallMouseOut} />
        <p>축구</p>
      </div>
      <div>
        <img src={isbaseballHovered ? baseballGif : baseball} alt="ball" style={{ width: "70px", height: "auto" }} onMouseOver={handlebaseballMouseOver} onMouseOut={handlebaseballMouseOut} />
        야구
      </div>
      <div>
        <img src={isgameHovered ? gameGif : game} alt="game" style={{ width: "70px", height: "auto" }} onMouseOver={handlegameMouseOver} onMouseOut={handlegameMouseOut} />
        게임
      </div>
      <div>
        <img src={istvHovered ? tvGif : tv} alt="tv" style={{ width: "70px", height: "auto" }} onMouseOver={handletvMouseOver} onMouseOut={handletvMouseOut} />
        예능
      </div>
      <div>
        <img src={isfilmHovered ? filmGif : film} alt="film" style={{ width: "70px", height: "auto" }} onMouseOver={handlefilmMouseOver} onMouseOut={handlefilmMouseOut} />
        영화/드라마
      </div>
      <div>
        <img src={isburgerHovered ? burgerGif : burger} alt="burger" style={{ width: "70px", height: "auto" }} onMouseOver={handleburgerMouseOver} onMouseOut={handleburgerMouseOut} />
        음식
      </div>
      <div>
        <img src={isfriendsHovered ? friendsGif : friends} alt="friends" style={{ width: "70px", height: "auto" }} onMouseOver={handlefriendsMouseOver} onMouseOut={handlefriendsMouseOut} />
        잡담
      </div>
    </div>
  );
}

export default CategoryBtn;
