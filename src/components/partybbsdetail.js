import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-modal";
import axios from "axios";
import MapContainer from "./mapcontainer/MapContainer";
import DetailMap from "./mapcontainer/detailMap";
//import { useIsFocused } from "@react-navigation/native";

import PartyBbslikey from "./partybbslikey";
import PartyBbsReply from "./partybbsreply";
import PartyBbsReadcount from "./partybbsreadcount";

function Partybbsdetail() {
  const mdstyle = {
    overlay: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0, 0, 0, 0.45)",
      zIndex: 10,
    },
    content: {
      display: "flex",
      justifyContent: "center",
      background: "#ffffff",
      overflow: "auto",
      top: "50%",
      left: "50%",
      width: "600px",
      height: "600px",
      transform: "translate(-50%, -50%)",
      WebkitOverflowScrolling: "touch",
      borderRadius: "14px",
      outline: "none",
      zIndex: 10,
      display: "flex",
      flexDirection: "column",
    },
  };
  let params = useParams();
  let history = useNavigate();
  const [id, setId] = useState("");
  const [partybbslist, setPartybbslist] = useState([]);
  const [profile, setProfile] = useState("");
  const [flg, setFlg] = useState("");

  //const { partybbsSeq } = useParams();
  const [partybbsSeq, setPartybbsseq] = useState(params.seq);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [memberSeq, setMemberSeq] = useState();

  //댓글
  const [replySeq, setReplySeq] = useState();

  const [writer, setWriter] = useState("");

  //const isFocused = useIsFocused();
  let login = JSON.parse(localStorage.getItem("login"));
  useEffect(() => {
    if (login) {
      // 빈칸이 아닐때
      setMemberSeq(login.memberSeq);
      setId(login.id);
      setProfile(login.profile);
      setWriter(login.id);
    } else {
      // alert('로그인해 주십시오');
      history("/login");
    }
  }, []);

  const seqs = { memberSeq: memberSeq, bbsSeq: partybbsSeq };

  function getpartyBbs() {
    axios
      .get(`http://118.67.132.98:3000/partyBbsdetail`, { params: { partySeq: partybbsSeq } })
      .then((response) => {
        setPartybbslist(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function preventSecond() {
    axios
      .get(`http://118.67.132.98:3000/getRow`, { params: { partySeq: partybbsSeq, applyMem: id, masterId: partybbslist.id } })
      .then((res) => {
        //console.log(res.data);
        setFlg(res.data);
        //console.log("머니??" + flg);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(function() {
    if (id) {
      preventSecond(partybbsSeq, id);
    }
  });

  const apply = async (e) => {
    /* e.preventDefault(); */
    const formData = new FormData();
    formData.append("partySeq", partybbsSeq);
    formData.append("applyMem", id);
    formData.append("profile", profile);
    formData.append("title", partybbslist.title);
    formData.append("masterId", partybbslist.id);
    formData.append("totalMem", partybbslist.people);
    for (const keyValue of formData) console.log(keyValue);
    await axios
      .post("http://118.67.132.98:3000/partyApply ", formData)
      .then(function(res) {
        if (res.data === "YES") {
          alert("요청성공");
          getpartyBbs(); //바로 반영
          totalApplyCnt(); //바로 반영
        } else {
          alert("요청 실패");
        }
      })
      .catch(function(err) {
        alert(err);
      });
  };

  const pbdelete = async () => {
    /*   e.preventDefault(); */
    const formData = new FormData();
    formData.append("partySeq", partybbsSeq);
    await axios
      .post("http://118.67.132.98:3000/deletePartybbs ", formData)

      .then(function(res) {
        if (res.data === "YES") {
          alert("삭제되었습니다.");
        } else {
          alert("삭제에 실패했습니다");
        }
      })
      .catch(function(err) {
        console.log(err);
      });
  };

  function onRemove() {
    if (window.confirm("정말 삭제하겠습니까? ")) {
      pbdelete();
      history("/partybbslist");
    } else {
      alert("글 삭제를 취소합니다.");
    }
  }
  function onJoin() {
    if (window.confirm("모임에 참여하시겠습니까? ")) {
      apply();
    } else {
      alert("참여신청을 취소합니다.");
    }
  }
  const imageUrl = partybbslist.image !== null ? `http://118.67.132.98:3000/upload/partybbs/${partybbslist.image}` : null;

  //총신청인원
  const [applyCnt, setApplyCnt] = useState();

  function totalApplyCnt() {
    axios
      .get("http://118.67.132.98:3000/applyMemCnt", {
        params: {
          partySeq: partybbsSeq,
        },
      })
      .then(function(resp) {
        setApplyCnt(resp.data);
      })
      .catch(function(err) {
        alert(err);
      });
  }
  //확정인원
  const [checkCnt, setCheckCnt] = useState();

  function totalCheckCnt() {
    axios
      .get("http://118.67.132.98:3000/applyCheckMemCnt", {
        params: {
          partySeq: partybbsSeq,
        },
      })
      .then(function(resp) {
        setCheckCnt(resp.data);
      })
      .catch(function(err) {
        alert(err);
      });
  }

  useEffect(() => {
    getpartyBbs();
    totalApplyCnt();
    totalCheckCnt();
    setReplySeq(params.seq);
  }, [params.seq]);

  return (
    <div>
      <br /> <br />
      <h3>모집글 보기</h3>
      <br /> <br />
      <table className="ttable" align="center" /* style={{ textAlign: "left" }} */>
        <colgroup>
          <col width={"150px"} />
          <col width={"500px"} />
          <col width={"150px"} />
          <col width={"200px"} />
        </colgroup>
        <tbody>
          <tr>
            <th>제목</th>
            <td colSpan={3}>{partybbslist.title}</td>
          </tr>
          <tr>
            <th>작성자</th>
            <td>{partybbslist.id}</td>
            <th>조회수</th>
            <td>
              <PartyBbsReadcount seqs={seqs} />
            </td>
          </tr>
          <tr>
            <th>작성시간</th>
            <td>{partybbslist.wdate}</td>
            <th>좋아요</th>
            <td>
              <PartyBbslikey seqs={seqs} />
            </td>
          </tr>
          <tr>
            <th>모임 일시</th>
            <td>{partybbslist.mdate}</td>
            <th rowSpan={2}>모임 장소</th>
            <td rowSpan={2}>
              {partybbslist.place} &nbsp;&nbsp;&nbsp;&nbsp;
              <Button variant="warning" size="sm" onClick={() => setModalIsOpen(true)}>
                장소보기
              </Button>
              <Modal isOpen={modalIsOpen} style={mdstyle} onRequestClose={() => setModalIsOpen(false)} shouldCloseOnOverlayClick={false}>
                <DetailMap searchPlace={partybbslist.place} />
                <div style={{ marginTop: "auto" }}>
                  <button onClick={() => setModalIsOpen(false)}>창닫기</button>
                </div>
              </Modal>
            </td>
          </tr>
          <tr>
            <th>참여신청보내기</th>
            <td>
              {partybbslist.id !== id && flg === "NO" ? (
                <>
                  <Button variant="primary" onClick={() => onJoin()}>
                    참여 신청
                  </Button>
                </>
              ) : partybbslist.id === writer ? (
                <span>내가 방장인 게시글입니다</span>
              ) : (
                <>
                  <p style={{ fontSize: "15px", color: "green" }}>참여 요청을 보냈습니다.</p>
                  <span style={{ fontSize: "15px", color: "green" }}>승인여부는 [마이페이지]-[파티 요청]에서 확인가능합니다 </span>
                </>
              )}
            </td>
          </tr>
          <tr>
            <th>참여확정인원</th>
            <td>

              {checkCnt}/{partybbslist.people}

            </td>
            <th>현재신청인원</th>
            <td>{applyCnt}</td>
          </tr>

          <tr>
            <td colSpan={4}>
              <br /> <br />
              {partybbslist.imageurl !== null ? (
                <img
                  src={partybbslist.imageurl}
                  alt="no image"
                  style={{
                    width: "100%",
                    height: "auto",
                    objectFit: "cover",
                    objectPosition: "center",
                  }}
                />
              ) : null}
              <br /> <br />
              <pre>{partybbslist.content}</pre>
              <br /> <br />
              {/*    <PartyBbslikey seqs={seqs} /> <br /> <br /> */}
            </td>
          </tr>
          {login && (
            <tr>
              <td colSpan={4}>
                <PartyBbsReply replySeq={params.seq} writer={writer} />
                <br /> <br />
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <br />
      <Button variant="outline-secondary" size="sm" onClick={() => history("/partybbslist")}>
        목록
      </Button>
      &nbsp;&nbsp;
      {partybbslist.id === writer ? (
        <Button variant="outline-secondary" size="sm" onClick={() => history(`/partybbsupdate/${partybbsSeq}`)}>
          수정
        </Button>
      ) : null}
      &nbsp;&nbsp;
      {partybbslist.id === writer ? (
        <Button variant="outline-secondary" size="sm" onClick={() => onRemove()}>
          삭제
        </Button>
      ) : null}
      <br /> <br />
      <br />
      <br />
    </div>
  );
}

export default Partybbsdetail;
