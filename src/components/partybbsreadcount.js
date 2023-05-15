import { useState, useRef, useEffect } from "react";
import axios from "axios";

function PartyBbsReadcount(props) {
  const { bbsSeq, memberSeq } = props.seqs;
  const [cntread, setCntread] = useState();

  //read테이블에 bbsSeq, memSeq조건을 만족하는 로우가 있는지 확인
  async function checkReadrow() {
    try {
      const res = await axios.get("http://118.67.132.98:3000/partycheckReadrow", {
        params: { bbsSeq: bbsSeq, memSeq: memberSeq },
      });
      console.log(res.data);
      if (res.data === 0) {
        //이미 있으면 1 없으면 0
        return true;
      } else {
        //alert("이미 존재합니다");
        return false;
      }
    } catch (err) {
      alert(err);
    }
  }

  //read테이블에 로우 삽입
  function makeReadrow() {
    axios
      .post("http://118.67.132.98:3000/partymakeReadrow", null, {
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
      .catch(function(err) {
        alert(err);
      });
  }
  //게시글당 조회수
  async function cntRead() {
    try {
      const res = await axios.get("http://118.67.132.98:3000/partycntRead", {
        params: { bbsSeq: bbsSeq },
      });
      console.log(res.data);
      setCntread(res.data);
    } catch (err) {
      alert(err);
    }
  }

  useEffect(() => {
    if (memberSeq) {
      //비회원일시 memberseq안넘어옴
      if (checkReadrow()) {
        makeReadrow();
      }
    }
  }, [memberSeq]);

  useEffect(() => {
    cntRead();
  }, [cntread]);

  return <> {cntread}</>;
}
export default PartyBbsReadcount;
