import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";

//import Modal from 'react-modal';

import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import MapContainer from "./mapcontainer/MapContainer";
import { Button, Form, InputGroup, Container, Row, Col, FloatingLabel, Modal } from "react-bootstrap";
import { auth, db, firebasePhotoApp, storage } from "./firebasePhoto";
import { getStorage, ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";

//npm install react-datepicker

function Partybbs() {
  // const mdstyle = {
  //     overlay: {
  //         position: "fixed",
  //         top: 0,
  //         left: 0,
  //         right: 0,
  //         bottom: 0,
  //         backgroundColor: "rgba(0, 0, 0, 0.45)",
  //         zIndex: 10,
  //     },
  //     content: {
  //         display: "flex",
  //         justifyContent: "center",
  //         background: "#ffffff",
  //         overflow: "auto",
  //         top: "50%",
  //         left: "50%",
  //         width: "600px",
  //         height: "700px",
  //         transform: "translate(-50%, -50%)",
  //         WebkitOverflowScrolling: "touch",
  //         borderRadius: "14px",
  //         outline: "none",
  //         zIndex: 10,
  //         display: "flex",
  //         flexDirection: "column",
  //     },
  // };

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

  const [image, setImage] = useState("");
  const imgRef = useRef();

  const [imageUpload, setImageUpload] = useState(null);
  const [imageurl, setImageurl] = useState(null);

  const storage = getStorage(firebasePhotoApp);

  function imageLoad() {
    const file = imgRef.current.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImage(reader.result);
    };
    //console.log(image);
  }

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
    const dat = MDate.getTime();
    const formattedTimestamp = new Date(dat)
      .toISOString()
      .slice(0, 19)
      .replace("T", " ");
    /*  console.log(formattedTimestamp); */
    formData.append("id", id);
    /*  formData.append("title", title); */
    formData2.append("id", id);
    formData2.append("place", place);
    formData2.append("mdate", formattedTimestamp);
    formData2.append("image", image);
    //formData.append("category", category);
    //for (const keyValue of formData) console.log(keyValue);
    /*     for (const keyValue of formData2) console.log(keyValue);
    for (const keyValue of formData) console.log(keyValue); */

    if (document.frm2.uploadFile.files[0] === null || document.frm2.uploadFile.files[0] === "") {
      formData2.append("uploadFile", "basic");
      formData2.append("imageurl", imageurl);
    } else {
      console.log(document.frm2.uploadFile.files[0].name);
      formData2.append("uploadFile", document.frm2.uploadFile.files[0]);
      const imageRef = ref(storage, `images/${imageUpload.name}`);
      const snapshot = await uploadBytes(imageRef, imageUpload);
      await getDownloadURL(snapshot.ref).then((url) => {
        formData2.append("imageurl", url);
        console.log("imgurl : " + url);
      });
    }
    for (const keyValue of formData2) console.log(keyValue)
    await axios
      .post("http://118.67.132.98:3000/writePartybbs", formData2)
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

  const handleImageUpload = (event) => {
    setImageUpload(event.target.files[0]);
    imageLoad();
  };

  return (
    <Container>
      <br /> <br />
      <h3>모집게시판 글쓰기</h3>
      <br /> <br />
      <form id="frm">
        {/* 모임장소 */}
        <table className="ttable" border="1" align="center">
          <colgroup>
            <col width={"150px"} />
            <col width={"500px"} />
          </colgroup>
          <tbody>
            <tr>
              <th>제목</th>
              <td>
                {/* 제목 */}
                <Row className="justify-content-md-center">
                  <Col>
                    <FloatingLabel controlTitle="floatingInput" label="제목을 입력해주세요">
                      <Form.Control type="text" name="title" placeholder="제목을 입력해주세요" onChange={titleChange} />
                    </FloatingLabel>
                  </Col>
                </Row>
              </td>
            </tr>
            <tr>
              <th>카테고리</th>
              <td>
                <Row className="justify-content-md-center">
                  <Col>
                    <Form.Select aria-label="Default select example" name="tag" onChange={(e) => setCategory(e.target.value)}>
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
                    </Form.Select>
                  </Col>
                  {/* 모집유형 */}
                  <Col>
                    <Form.Select aria-label="Default select example" name="partytype" onChange={(e) => setMCategory(e.target.value)}>
                      <option>모집유형</option>
                      <option value={1}>관람</option>
                      <option value={2}>팀원</option>
                    </Form.Select>
                  </Col>
                </Row>
              </td>
            </tr>
            <tr>
              <th>모임장소</th>
              <td>
                <Row className="justify-content-md-center">
                  <Col>
                    <InputGroup className="mb-3">
                      <FloatingLabel controlTitle="floatingInput">
                        <Form.Control placeholder="모임장소" aria-label="모임장소" aria-describedby="basic-addon2" onChange={placeChange} value={place} />
                        <label style={{ color: "red" }}>글 작성후 모임장소와 일시는 변경할 수 없습니다</label>
                      </FloatingLabel>
                      <Button variant="outline-secondary" id="button-addon2" onClick={() => setModalIsOpen(true)}>
                        주소찾기
                      </Button>
                    </InputGroup>
                  </Col>
                </Row>

                {/* 지도 모달 */}
                <Modal show={modalIsOpen} onHide={() => setModalIsOpen(false)} backdrop="static" keyboard={false} size="lg" centered>
                  <Modal.Header closeButton>
                    <Modal.Title>주소찾기</Modal.Title>
                  </Modal.Header>

                  <Modal.Body>
                    <form className="inputForm" onSubmit={handleSubmit}>
                      <InputGroup className="mb-3">
                        <Form.Control type="text" placeholder="검색어를 입력하세요" onChange={onChange} value={InputText} />
                        <Button type="submit" variant="primary">
                          검색
                        </Button>
                      </InputGroup>
                    </form>
                    <MapContainer setPla={setPla} setAddr={setAddr} searchPlace={search} />
                  </Modal.Body>

                  <Modal.Footer>
                    <div style={{ marginRight: "90%" }}>상세주소</div>
                    <Form.Control type="text" value={address} readOnly />
                    <Button variant="secondary" onClick={() => setModalIsOpen(false)}>
                      완료
                    </Button>
                  </Modal.Footer>
                </Modal>
              </td>
            </tr>

            <tr>
              <th>상세주소</th>
              <td>
                {/* 상세주소 */}
                <Row className="justify-content-md-center">
                  <Col>
                    <Form.Control type="text" placeholder="상세주소" value={address} />
                  </Col>
                </Row>
              </td>
            </tr>

            <tr>
              <th>날짜 & 시간 설정</th>

              <td>
                <Row className="justify-content-md-center">
                  <Col>
                    <FloatingLabel controlTitle="floatingInput">
                      <DatePicker selected={MDate} onChange={(date) => setMDate(date)} minDate={currentDate} showTimeSelect dateFormat="yyyy-MM-dd HH:mm:ss" customInput={<Form.Control />} />
                    </FloatingLabel>
                  </Col>
                </Row>
              </td>
            </tr>
            <tr>
              <th>인원 수 설정</th>

              <td>
                <Row className="justify-content-md-center">
                  <Col>
                    <InputGroup>
                      <Form.Control aria-label="Recipient's username with two button addons" type="text" name="people" value={mnum} onChange={mnumChange} readOnly />
                      <Button variant="outline-primary" onClick={() => setMnum(mnum + 1)}>
                        up
                      </Button>
                      <Button variant="outline-danger" onClick={() => setMnum(mnum - 1)}>
                        down
                      </Button>
                    </InputGroup>
                  </Col>
                </Row>
              </td>
            </tr>

            <tr align="left">
              <td colSpan={2}>
                <form name="frm2" onSubmit={fetchData()} encType="multipart/form-data">
                  <input type="file" onChange={handleImageUpload} ref={imgRef} name="uploadFile" /> {/* <input type="file" name="uploadFile" /> */}
                </form>
              </td>
            </tr>
            <tr style={{ border: "none" }}>
              <td style={{ border: "none" }} colSpan={2}>
                <img
                  src={image}
                  alt=""
                  style={{
                    width: 500,
                    height: "auto",
                    objectFit: "cover",
                    objectPosition: "center",
                    padding: 20,
                  }}
                />

                <Row className="justify-content-md-center">
                  <Col>
                    <Form.Control
                      as="textarea"
                      rows={18}
                      style={{ border: "none", width: "100%", resize: "none" }}
                      value={content}
                      name="content"
                      placeholder="내용을 입력해주세요"
                      onChange={contentChange}
                    />
                  </Col>
                </Row>
                <br />
              </td>
            </tr>

            <tr>
              <td colSpan={2}>
                <Row className="justify-content-md-center">
                  <Col md={4}>
                    <div className="d-grid gap-2">
                      <Button variant="primary" onClick={fetchData}>
                        작성
                      </Button>
                    </div>
                  </Col>
                </Row>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </Container>
  );
}

export default Partybbs;
