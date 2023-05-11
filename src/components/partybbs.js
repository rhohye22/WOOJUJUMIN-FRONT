import React, { useEffect, useState } from "react";

import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import Modal from "react-modal";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import MapContainer from "./mapcontainer/MapContainer";

//npm install react-datepicker
function Partybbs() {
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

  let history = useNavigate();
  const [id, setId] = useState("");
  const [category, setCategory] = useState("");
  const [Mcategory, setMCategory] = useState("");
  const [title, setTitle] = useState("");
  const [place, setPlace] = useState("");
  const [address, setAddress] = useState("");
  const [content, setContent] = useState("");
  const [MDate, setMDate] = useState(new Date());
  const [mnum, setMnum] = useState(0);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [InputText, setInputText] = useState("");
  const [search, setSearch] = useState("");
  const setAddr = (e) => {
    setAddress(e);
  };

  const setPla = (e) => {
    setPlace(e);
  };
  useEffect(() => {
    let login = JSON.parse(localStorage.getItem("login"));
    if (login !== undefined) {
      // 빈칸이 아닐때

      setId(login.id);
    } else {
      // alert('로그인해 주십시오');
      history("/login");
    }
  }, [history]);

  console.log(modalIsOpen);
  const onChange = (e) => {
    setInputText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setInputText(e.target.value);
    setSearch(InputText);
    //setInputText('')
    //console.log("chk2");
  };

  const titleChange = (e) => setTitle(e.target.value);
  const placeChange = (e) => setPlace(e.target.value);
  const contentChange = (e) => setContent(e.target.value);
  const mnumChange = (e) => setMnum(e.target.value);

  const fetchData = async (e) => {
    e.preventDefault();
    //const formData = new FormData(frm);
    if (!place || !category || !Mcategory || !title || !address || !content) {
      alert("값을 전부 채워주세요!");
      return;
    }
    if (mnum <= 1) {
      alert("인원수는 최소 2명이어야 합니다.");
      return;
    }
    const formData = new FormData();
    const formData2 = new FormData(document.getElementById("frm"));
    console.log(MDate);
    const dat = MDate.getTime();
    console.log(dat);
    const formattedTimestamp = new Date(dat)
      .toISOString()
      .slice(0, 19)
      .replace("T", " ");
    console.log(formattedTimestamp);
    formData.append("id", id);
    formData.append("title", title);
    formData2.append("id", id);
    formData2.append("place", place);
    formData2.append("mdate", formattedTimestamp);
    //formData.append("category", category);
    //for (const keyValue of formData) console.log(keyValue);
    for (const keyValue of formData2) console.log(keyValue);
    for (const keyValue of formData) console.log(keyValue);
    await axios
      .post("http://localhost:3000/writePartybbs", formData2)
      .then(function(res) {
        console.log(res.data);
        if (res.data === "YES") {
          alert("글이 작성되었습니다.");
          history("/partybbslist");
        }
      })
      .catch(function(err) {
        console.log(err);
      });
  };

  return (
    <div>
      <input type="text" placeholder="모임장소" onChange={placeChange} value={place} />
      <button onClick={() => setModalIsOpen(true)}>주소찾기</button>
      <br />
      <Modal isOpen={modalIsOpen} style={mdstyle} onRequestClose={() => setModalIsOpen(false)}>
        <form className="inputForm" onSubmit={handleSubmit}>
          <input placeholder="검색어를 입력하세요" onChange={onChange} value={InputText} />
          <button type="submit">검색</button>
        </form>
        <MapContainer setPla={setPla} setAddr={setAddr} searchPlace={search} /> {/*수정필요 */}
        상세주소 : <input type="text" value={address} readOnly />
        <br />
        <button onClick={() => setModalIsOpen(false)}>완료</button>
      </Modal>
      <form id="frm">
        <select name="tag" onChange={(e) => setCategory(e.target.value)}>
          <option>카테고리</option>
          <option value={1}>농구</option>
          <option value={2}>축구</option>
          <option value={3}>야구</option>
          <option value={4}>예능</option>
          <option value={5}>드라마/영화</option>
          <option value={6}>게임</option>
          <option value={7}>음식</option>
          <option value={8}>함께</option>
          <option value={9}>탐사</option>
          <option value={10}>잡담</option>
        </select>
        <select name="partytype" onChange={(e) => setMCategory(e.target.value)}>
          <option>모집유형</option>
          <option value={1}>관람</option>
          <option value={2}>팀원</option>
        </select>
        <br />
        <input type="text" name="title" placeholder="제목을 입력해주세요" onChange={titleChange} />
        <br />
        {/* <input type="text" name="place" placeholder="모임장소" onChange={placeChange} readOnly/><br/> */}
        <input type="text" placeholder="상세주소" value={address} />
        <br />
        <DatePicker selected={MDate} onChange={(date) => setMDate(date)} minDate={currentDate} showTimeSelect dateFormat="yyyy-MM-dd HH:mm:ss" />
        <input type="text" name="people" value={mnum} onChange={mnumChange} readOnly />
        <button type="button" onClick={() => setMnum(mnum + 1)}>
          up
        </button>
        <button type="button" onClick={() => setMnum(mnum - 1)}>
          down
        </button>
        <br />
        <textarea value={content} name="content" placeholder="내용을 입력해주세요" onChange={contentChange} />
        <br />
        <button onClick={fetchData}>작성</button>
      </form>
    </div>
  );
}

export default Partybbs;
