import { useEffect, useState, useRef } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import CloseButton from "react-bootstrap/CloseButton";
import { Button, Form, InputGroup, Container, Row, Col, FloatingLabel, Modal } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import MapContainer from "./mapcontainer/MapContainer";
function Partybbsupdate() {
  let params = useParams("");
  let history = useNavigate();
  /*   const [id, setId] = useState("");
 
  const [title, setTitle] = useState("");
  const [place, setPlace] = useState("");
  const [content, setContent] = useState("");
  const [MDate, setMDate] = useState(new Date());
  const [mnum, setMnum] = useState(0);
  console.log(params.seq); */
  const [pbsdetail, setPbsdetail] = useState([]);

  const [id, setId] = useState("");
  const [category, setCategory] = useState("");
  const [Mcategory, setMCategory] = useState("");
  const [title, setTitle] = useState("");

  const [address, setAddress] = useState("");
  const [content, setContent] = useState("");
  const [MDate, setMDate] = useState(new Date());
  const [mnum, setMnum] = useState(0);

  const [image, setImage] = useState("");
  const imgRef = useRef();

  function imageLoad() {
    const file = imgRef.current.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImage(reader.result);
    };
    //console.log(image);
  }

  const titleChange = (e) => setTitle(e.target.value);
  const contentChange = (e) => setContent(e.target.value);

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

  useEffect(() => {
    axios
      .get(`http://118.67.132.98:3000/partyBbsdetail`, { params: { partySeq: params.seq } })
      .then((response) => {
        console.log(response.data);
        setPbsdetail(response.data);
        setTitle(response.data.title);
        setContent(response.data.content);
        setCategory(response.data.tag);
        setMCategory(response.data.partytype);
        setAddress(response.data.place);
        setMDate(response.data.mdate);
        setMnum(response.data.people);
        if (response.data.image !== null) {
          setImage(response.data.image);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [params.seq]);

  function updatepbs(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append("partySeq", params.seq);
    formData.append("id", id);
    formData.append("title", title);
    formData.append("content", content);
    formData.append("tag", category);
    formData.append("partytype", Mcategory);
    formData.append("people", mnum);
    formData.append("image", image);

    if (document.frm2.uploadFile.files[0] == null || document.frm2.uploadFile.files[0] == "") {
      formData.append("uploadFile", "basic");
    } else {
      console.log(document.frm2.uploadFile.files[0].name);
      formData.append("uploadFile", document.frm2.uploadFile.files[0]);
    }

    axios
      .post("http://118.67.132.98:3000/updatePartybbs", formData)
      .then(function(res) {
        console.log(res.data);
        if (res.data === "YES") {
          alert("글이 수정되었습니다.");
          history(`/partybbsdetail/${params.seq}`);
        } else {
          alert("게시글 수정에 실패했습니다");
        }
      })
      .catch(function(err) {
        alert(err);
        alert("에러");
      });
  }
  const imageUrl = image == pbsdetail.image ? `http://118.67.132.98:3000/upload/partybbs/${image}` : image;

  return (
    <div>
      <Container>
        <br />
        <h3>모집글 수정</h3>
        <br />
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
                        <Form.Control type="text" name="title" value={title} placeholder="제목을 입력해주세요" onChange={(e) => setTitle(e.target.value)} />
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
                      <Form.Select aria-label="Default select example" value={category} name="tag" onChange={(e) => setCategory(e.target.value)}>
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
                      <Form.Select aria-label="Default select example" value={Mcategory} name="partytype" onChange={(e) => setMCategory(e.target.value)}>
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
                  {/* 제목 */}
                  <Row className="justify-content-md-center">
                    <Col>
                      <FloatingLabel controlTitle="floatingInput">
                        <Form.Control type="text" name="title" value={address} readOnly />
                        <label style={{ color: "red" }}>모임장소는 변경할 수 없습니다</label>
                      </FloatingLabel>
                    </Col>
                  </Row>
                </td>
              </tr>
              <tr>
                <th>모임시간</th>
                <td>
                  {/* 제목 */}
                  <Row className="justify-content-md-center">
                    <Col>
                      <FloatingLabel controlTitle="floatingInput">
                        <Form.Control type="text" name="title" value={MDate} readOnly />
                        <label style={{ color: "red" }}>모임시간은 변경할 수 없습니다</label>
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
                        <Form.Control aria-label="Recipient's username with two button addons" type="text" name="people" value={mnum} onChange={(e) => setMnum(e.target.value)} readOnly />
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
                  <form name="frm2" onSubmit={updatepbs} encType="multipart/form-data">
                    <input type="file" onChange={imageLoad} ref={imgRef} name="uploadFile" />
                  </form>
                </td>
              </tr>
              <tr style={{ border: "none" }}>
                <td style={{ border: "none" }} colSpan={2}>
                  {imageUrl !== "" && imageUrl !== null ? (
                    <div>
                      <div>
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
                      </div>
                      <CloseButton onClick={() => setImage("")} />
                    </div>
                  ) : null}

                  <Row className="justify-content-md-center">
                    <Col>
                      <Form.Control
                        as="textarea"
                        rows={18}
                        style={{ border: "none", width: "100%", resize: "none" }}
                        value={content}
                        name="content"
                        placeholder="내용을 입력해주세요"
                        onChange={(e) => setContent(e.target.value)}
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
                        <Button variant="primary" onClick={updatepbs}>
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
    </div>
  );
}

export default Partybbsupdate;
