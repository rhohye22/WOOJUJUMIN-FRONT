import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-modal";
import axios from "axios";
import MapContainer from "./mapcontainer/MapContainer";
import DetailMap from "./mapcontainer/detailMap";
//import { useIsFocused } from "@react-navigation/native";
function Partybbsdetail() {
  let params = useParams("");
  let history = useNavigate();
  const [id, setId] = useState("");
  const [partybbslist, setPartybbslist] = useState([]);
  const [profile, setProfile] = useState("");
  const [flg, setFlg] = useState("");
  const [writer, setWriter] = useState("");
  //const { partybbsSeq } = useParams();
  const [partybbsSeq, setPartybbsseq] = useState(params.seq);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  //const isFocused = useIsFocused();
  useEffect(() => {
    let login = JSON.parse(localStorage.getItem("login"));
    if (login !== undefined) {
      // 빈칸이 아닐때

      setId(login.id);
      setProfile(login.profile);
      setWriter(login.id);
      /*  setPartybbsseq(params.seq); */
      console.log(partybbsSeq);
    } else {
      // alert('로그인해 주십시오');
      history("/login");
    }
  }, [history]);

  function getpartyBbs() {
    axios
      .get(`http://localhost:3000/partyBbsdetail`, { params: { partySeq: partybbsSeq } })
      .then((response) => {
        console.log(response.data);
        setPartybbslist(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  useEffect(() => {
    getpartyBbs();
  }, [partybbsSeq]);

  function preventSecond() {
    axios
      .get(`http://localhost:3000/getRow`, { params: { partySeq: partybbsSeq, applyMem: id, masterId: partybbslist.id } })
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
      .post("http://localhost:3000/partyApply ", formData)
      .then(function(res) {
        console.log(res.data);
        if (res.data === "YES") {
          alert("요청성공");
          getpartyBbs();
          /*   document.location.href = "/partybbsdetail/" + partybbsSeq; */
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
      .post("http://localhost:3000/deletePartybbs ", formData)

      .then(function(res) {
        console.log(res.data);
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
  const imageUrl = partybbslist.image !== null ? `http://localhost:3000/upload/party/${partybbslist.image}` : null;


  return (
    <div>
      <table className="ttable" align="center" /* style={{ textAlign: "left" }} */>
        <colgroup>
          <col width={"100px"} />
          <col width={"500px"} />
          <col width={"150px"} />
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
              {/*   <FreeBbsReadcount seqs={seqs} /> */}
              조회수숫자
            </td>
          </tr>
          <tr>
            <th>작성시간</th>
            <td>{partybbslist.wdate}</td>
            <th>좋아요</th>
            <td>좋아요숫자</td>
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
              <Modal
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
                shouldCloseOnOverlayClick={false}
                style={{
                  overlay: {
                    backgroundColor: "rgba(0, 0, 0, 0.1)",
                  },
                  content: {
                    marginTop: "60px",
                    width: "600px",
                    height: "600px",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                  },
                }}
              >
                <DetailMap searchPlace={partybbslist.place} />
                <button onClick={() => setModalIsOpen(false)}>창닫기</button>
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
                <p>내가 방장인 게시글입니다</p>
              ) : (
                <p>신청완료</p>
              )}
            </td>
          </tr>
          <tr>
            <th>참여확정인원</th>
            <td>
              {partybbslist.applymem}/{partybbslist.people}
            </td>
            <th>현재신청인원</th>
            <td>apply테이블에서 가져와야함</td>
          </tr>

          <tr>
            <td colSpan={4}>
              <br /> <br />
              {imageUrl !== null ? (
                <img
                  src={imageUrl}
                  alt="no image"
                  style={{
                    width: 500,
                    height: "auto",
                    objectFit: "cover",
                    objectPosition: "center",
                  }}
                />
              ) : null}
              <br /> <br />
              <pre>{partybbslist.content}</pre>
              <br /> <br />
              {/*        {login && <FreeBbslikey seqs={seqs} />} <br /> <br />  <button>댓글</button> */}
            </td>
          </tr>
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
      &nbsp;&nbsp;{" "}
      {partybbslist.id === writer ? (
        <Button variant="outline-secondary" size="sm" onClick={() => onRemove()}>
          삭제
        </Button>
      ) : null}
      &nbsp;&nbsp; &nbsp;&nbsp;
      <br /> <br />
      <br />
      <br />
    </div>
  );

}

export default Partybbsdetail;
