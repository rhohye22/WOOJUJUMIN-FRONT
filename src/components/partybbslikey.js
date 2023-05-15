import { useState, useRef, useEffect } from "react";
import axios from "axios";

import redheart from "./image/free-icon-hearts-138533.png";
import nonheart from "./image/free-icon-heart-1077035.png";

function PartyBbslikey(props) {
  const [likey, setLikey] = useState(false);
  const [sumlikey, setSumlikey] = useState();
  const { bbsSeq, memberSeq } = props.seqs;

  ////입장시 페이지 좋아요 상태(개인별 기록 불러오기)
  async function likeyState() {
    try {
      const res = await axios.get("http://118.67.132.98:3000/partyLikeyState", {
        params: { bbsSeq: bbsSeq, memSeq: memberSeq },
      });
      console.log(res.data);
      if (res.data === 1) {
        setLikey(true);
      } else {
        return;
      }
    } catch (err) {
      alert(err);
    }
  }
  //게시글당 좋아요 개수
  async function cntLikey() {
    try {
      const res = await axios.get("http://118.67.132.98:3000/partycntLikey", {
        params: { bbsSeq: bbsSeq },
      });
      console.log("setSumlikey : " + res.data);
      setSumlikey(res.data);
    } catch (err) {
      alert(err);
    }
  }
  useEffect(() => {
    //비회원일시 memberseq안넘어옴
    if (memberSeq) {
      likeyState();
      cntLikey();
    }
  }, [sumlikey, likey, cntLikey]);
  /*   useEffect(() => {
    likeyState();
    cntLikey();
  }, []);
 */
  //likey테이블에 bbsSeq, memSeq조건을 만족하는 로우가 있는지 확인

  async function checkLikeyrow() {
    try {
      const res = await axios.get("http://118.67.132.98:3000/partycheckLikeyrow", {
        params: { bbsSeq: bbsSeq, memSeq: memberSeq },
      });
      console.log(res.data);
      if (res.data === 0) {
        return false;
      } else {
        //alert("이미 존재합니다");
        return true;
      }
    } catch (err) {
      alert(err);
    }
  }

  //likey테이블에 로우 삽입
  function makeLikeyrow() {
    axios
      .post("http://118.67.132.98:3000/partymakeLikeyrow", null, {
        params: { bbsSeq: bbsSeq, memSeq: memberSeq },
      })
      .then((res) => {
        console.log(res.data);
        if (res.data === "YES") {
          //alert("성공적으로 likey테이블에 로우가 삽입되었습니다");
        } else {
          //alert(" likey테이블에 로우가 등록되지 않았습니다");
        }
      })
      .catch(function(err) {
        alert(err);
      });
  }
  // 좋아요 +1
  function LikeyPlus() {
    axios
      .post("http://118.67.132.98:3000/partyLikeyPlus", null, {
        params: { bbsSeq: bbsSeq, memSeq: memberSeq },
      })
      .then((res) => {
        console.log(res.data);
        if (res.data === "YES") {
          //alert("좋아요가 1증가했습니다");
        } else {
          //alert("좋아요 1증가가 등록되지 않았습니다");
        }
      })
      .catch(function(err) {
        alert(err);
      });
  }

  // 좋아요 -1
  function LikeyMinus() {
    axios
      .post("http://118.67.132.98:3000/partyLikeyMinus", null, {
        params: { bbsSeq: bbsSeq, memSeq: memberSeq },
      })
      .then((res) => {
        console.log(res.data);
        if (res.data === "YES") {
          //alert("좋아요가 1감소했습니다");
        } else {
          //alert("등록되지 않았습니다");
        }
      })
      .catch(function(err) {
        alert(err);
      });
  }

  async function nonheartClick() {
    setLikey(!likey);

    const isRowExist = await checkLikeyrow();
    if (!isRowExist) {
      makeLikeyrow();
    }
    LikeyPlus();
    cntLikey();
  }

  function redheartClick() {
    setLikey(!likey);

    LikeyMinus();
    cntLikey();
  }

  return (
    <>
      {likey === false ? (
        <img src={nonheart} alt="My Image" onClick={nonheartClick} style={{ width: 30, height: 30 }} />
      ) : (
        <img src={redheart} alt="My Image" onClick={redheartClick} style={{ width: 30, height: 30 }} />
      )}
      <span>{sumlikey}</span>
    </>
  );
}

export default PartyBbslikey;
