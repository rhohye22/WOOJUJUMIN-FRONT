import { useState, useRef, useEffect } from "react";
import axios from "axios";

function FreeBbsReadcount(props) {
  const { bbsSeq, memberSeq } = props.seqs;
  const [cntread, setCntread] = useState();

  //read테이블에 bbsSeq, memSeq조건을 만족하는 로우가 있는지 확인
  async function checkReadrow() {
    try {
      const res = await axios.get("http://localhost:3000/checkReadrow", {
        params: { bbsSeq: bbsSeq, memSeq: memberSeq },
      });
      console.log(res.data);
      if (res.data === 0) {
        //이미 있으면 1 없으면 0
        return false;
      } else {
        //alert("이미 존재합니다");
        return true;
      }
    } catch (err) {
      alert(err);
    }
  }

  //read테이블에 로우 삽입
  function makeReadrow() {
    axios
      .post("http://localhost:3000/makeReadrow", null, {
        params: { bbsSeq: bbsSeq, memSeq: memberSeq },
      })
      .then((res) => {
        console.log(res.data);
        if (res.data === "YES") {
          //alert("성공적으로 read테이블에 로우가 삽입되었습니다");
        } else {
          //alert(" read테이블에 로우가 등록되지 않았습니다");
        }
      })
      .catch(function (err) {
        alert(err);
      });
  }
  //게시글당 좋아요 개수
  async function cntRead() {
    try {
      const res = await axios.get("http://localhost:3000/cntRead", {
        params: { bbsSeq: bbsSeq },
      });
      console.log(res.data);
      setCntread(res.data);
    } catch (err) {
      alert(err);
    }
  }

  useEffect(() => {
    if (checkReadrow()) {
      makeReadrow();
    }
  }, []);

  useEffect(() => {
    cntRead();
  }, [cntread]);

  return <>조회수 : {cntread}</>;
}
export default FreeBbsReadcount;
