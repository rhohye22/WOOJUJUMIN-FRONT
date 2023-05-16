import axios from "axios";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from 'react-router-dom';

function PartycardBtn() {

  const [bbsdto, setBbsdto] = useState([]);
  const [images, setImages] = useState([]);
  const [tag, setTag] = useState([]);
  const [title, setTitle] = useState([]);
  const [mdate, setMdate] = useState([]);
  const [peoplenum, setPeoplenum] = useState([]);

  useEffect(() => {
    const partypost = async () => {
      await axios.get("http://localhost:3000/mainPartypost", { params: {} })
        .then(function (res) {
          console.log(res.data)
          setBbsdto(res.data);
          setTag(res.data.tag);
          setTitle(res.data.title);
          setMdate(res.data.mdate);
          setPeoplenum(res.data.people);
        })
        .catch(function (err) {
          alert(err);
        })
    }

    partypost();

  }, []);

  function PartyCard() {

    console.log(bbsdto.length + '길이확인영');

    function dot14(msg) {
      return msg.length <= 14 ? msg : msg.substring(0, 14) + "...";
    }

    return (
      <>
        {bbsdto.map((dto, index) => {
          return (
            <Link to={`partybbsdetail/${dto.partySeq}`} >
              <div key={index} className="partycard">
                <img alt="recommemd" src={dto.image} width="130" height="130" style={{ borderRadius: "30px" }}></img>
                <div className="partycontent">
                  {dto.tag === 1 && (<p style={{ backgroundColor: "#f14e4e" }}>농구</p>)}
                  {dto.tag === 2 && (<p style={{ backgroundColor: "#dc9529" }}>축구</p>)}
                  {dto.tag === 3 && (<p style={{ backgroundColor: "#d7cb1c" }}>야구</p>)}
                  {dto.tag === 4 && (<p style={{ backgroundColor: "#86b467" }}>예능</p>)}
                  {dto.tag === 5 && (<p style={{ backgroundColor: "#a2d6e4" }}>드라마/영화</p>)}
                  {dto.tag === 6 && (<p style={{ backgroundColor: "#3676d4" }}>게임</p>)}
                  {dto.tag === 7 && (<p style={{ backgroundColor: "#1f1fe2" }}>음식</p>)}
                  {dto.tag === 8 && (<p style={{ backgroundColor: "#6e1fe2" }}>우주주민과 함께</p>)}
                  {dto.tag === 9 && (<p style={{ backgroundColor: "#d193e7" }}>우주주민과 탐사</p>)}
                  {dto.tag === 10 && (<p style={{ backgroundColor: "#585154" }}>잡담</p>)}
                  <p className="cardTitle">{dot14(dto.title)}</p>
                  <p>
                    <i>
                      {dto.partytype === 1 && ("관람 ")}
                      {dto.partytype === 2 && ("팀원 ")}
                      · 모임날짜 {dto.mdate.substring(0, 16)}
                    </i>
                  </p>

                  <p>모집인원 {dto.people}</p>
                </div>
              </div>
            </Link>
          )
        })}
      </>
    )
  };

  return (
    <>
      <PartyCard />
      {/* <div className="partycard">
        <img alt="recommemd" src="http://images.munto.kr/production-socialing/1683600044434-photo-9besu-426683-0?s=256x256" width="130" height="130" style={{ borderRadius: "30px" }}></img>
        <div className="partycontent"></div>
      </div>
      <div className="partycard">
        <img alt="recommemd" src="http://images.munto.kr/production-socialing/1683600044434-photo-9besu-426683-0?s=256x256" width="130" height="130" style={{ borderRadius: "30px" }}></img>
        <div className="partycontent"></div>
      </div>
      <div className="partycard">
        <img alt="recommemd" src="http://images.munto.kr/production-socialing/1683600044434-photo-9besu-426683-0?s=256x256" width="130" height="130" style={{ borderRadius: "30px" }}></img>
        <div className="partycontent"></div>
      </div>
      <div className="partycard">
        <img alt="recommemd" src="http://images.munto.kr/production-socialing/1683600044434-photo-9besu-426683-0?s=256x256" width="130" height="130" style={{ borderRadius: "30px" }}></img>
        <div className="partycontent"></div>
      </div>
      <div className="partycard">
        <img alt="recommemd" src="http://images.munto.kr/production-socialing/1683600044434-photo-9besu-426683-0?s=256x256" width="130" height="130" style={{ borderRadius: "30px" }}></img>
        <div className="partycontent"></div>
      </div>*/}
      {/* <div className="partycard">
        <img alt="recommemd" src="http://images.munto.kr/production-socialing/1683600044434-photo-9besu-426683-0?s=256x256" width="130" height="130" style={{ borderRadius: "30px" }}></img>
        <div className="partycontent"></div>
      </div> */}
    </>
  );
}

export default PartycardBtn;
