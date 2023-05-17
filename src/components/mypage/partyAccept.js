import * as React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Pagination from "react-js-pagination";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import "./accountInfo.css";

function PartyAccept() {
  let history = useNavigate();
  const [id, setId] = useState("");
  const [page, setPage] = useState(1);
  const [totalCnt, setTotalCnt] = useState(0);
  const [partyList, setPartyList] = useState([]);
  const [profile, setProfile] = useState("");
  const [value, setValue] = React.useState("one");
  const [surak, setSurak] = React.useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  // login 되어 있는지 검사
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

  function myPartyList(page) {
    axios
      .get("http://118.67.132.98:3000/myPartyList", { params: { pageNumber: page, id: id } })
      .then(function(resp) {
        //console.log(resp.data);
        setPartyList(resp.data.list); // map을 return하기 때문(map 안에 list있음)
        setTotalCnt(resp.data.cnt);
        setProfile(resp.data);
      })
      .catch(function(err) {
        alert(err);
      });
  }
  const check = (partySeq, applyMem) => {
    axios
      .get("http://118.67.132.98:3000/updateCheck", { params: { partySeq: partySeq, applyMem: applyMem } })
      .then(function(resp) {
        /*   document.location.href = "myinfo/mypartypage/partyAccept"; */
        setSurak(!surak);
      })
      .catch(function(err) {
        alert(err);
      });
  };
  const style = {
    width: "100%",
    maxWidth: 360,
    bgcolor: "background.paper",
  };
  useEffect(
    function() {
      if (id) {
        myPartyList(0);
      }
    },
    [id]
  );
  useEffect(() => {
    myPartyList();
  }, [surak]);

  function pageChange(page) {
    setPage(page);

    myPartyList(page - 1);
  }
  const gomy = () => {
    history("mybbsList");
  };
  const goinfo = () => {
    history("mypage");
  };
  const goparty = () => {
    history("partyAccept");
  };
  const gomyparty = () => {
    history("partyList");
  };
  const gobbs = () => {
    history("partyAccept");
  };
  const gofree = () => {
    history("partyRequest");
  };
  if (partyList.length > 0) {
    return (
      <>
        <div className="gamssagi3">
          {/*      <table border="1" style={{ margin: "0 auto" }} className='ttable'> */}
          <Table bordered hover>
            <colgroup>
              <col width="100" />
              <col width="600" />
              <col width="200" />
              <col width="100" />
              <col width="130" />
            </colgroup>
            <thead>
              <tr>
                <th>아이디</th>
                <th>파티제목</th>
                <th>날짜</th>
                <th>인원수</th>
                <th>수락여부</th>
              </tr>
            </thead>

            <tbody>
              {partyList.map(function(bbs, i) {
                return (
                  <tr key={i}>
                    <td align="center">
                      <img src={bbs.imageurl} style={{ width: "20px", height: "20px", borderRadius: "50%" }} />
                      &nbsp;{bbs.applyMem}
                    </td>
                    {/* <td align="center">{bbs.title}</td> */}

                    <td>
                      <div
                        style={{
                          width: "100%",
                          height: "50px",
                          overflow: "hidden",
                          display: "flex",
                          alignItems: "left",
                        }}
                        onClick={() => history(`/partybbsdetail/${bbs.partySeq}`)}
                      >
                        {bbs.image !== null ? (
                          <img
                            src={bbs.imageurl}
                            alt="free image"
                            style={{
                              width: 40,
                              height: "auto",
                              objectFit: "cover",
                              objectPosition: "center",
                            }}
                          />
                        ) : null}
                        &nbsp;&nbsp;
                        <div
                          style={{
                            textDecoration: "none",
                            color: "inherit",
                            cursor: "pointer",
                            flexGrow: 1,
                            display: "flex",
                            justifyContent: "flex-start",
                            alignItems: "center",
                            height: "100%",
                          }}
                        >
                          {bbs.title}
                        </div>
                      </div>
                    </td>

                    <td align="center">{bbs.wdate.substring(0, 10)}</td>
                    <td align="center">
                      {bbs.countMem}/{bbs.totalMem}
                    </td>

                    {bbs.countMem === bbs.totalMem ? (
                      <td align="center" className="partyWhat">
                        모집 완료
                      </td>
                    ) : bbs.check === 1 ? (
                      <td align="center" className="partyWhat">
                        <span style={{ color: "red" }}>참여 확정</span>
                      </td>
                    ) : (
                      <td align="center">
                        <Button
                          variant="success"
                          size="sm"
                          onClick={() => {
                            check(bbs.partySeq, bbs.applyMem);
                          }}
                        >
                          참여 승인
                        </Button>
                      </td>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </Table>

          <br></br>
          <Pagination activePage={page} itemsCountPerPage={10} totalItemsCount={totalCnt} pageRangeDisplayed={5} prevPageText={"이전"} nextPageText={"다음"} onChange={pageChange} />
        </div>
      </>
    );
  } else {
    return (
      <>
        <br></br>
        <br></br>
        <h3>작성된 내용이 없습니다.</h3>
        <br></br>
        <Pagination activePage={page} itemsCountPerPage={10} totalItemsCount={totalCnt} pageRangeDisplayed={5} prevPageText={"이전"} nextPageText={"다음"} onChange={pageChange} />
        <br></br>
      </>
    );
  }
}

export default PartyAccept;
