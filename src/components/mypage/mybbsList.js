import * as React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Pagination from "react-js-pagination";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import "./page.css";
import "./accountInfo.css";

//npm install @mui/material @emotion/react @emotion/styled --legacy-peer-deps
//npm install @mui/icons-material --legacy-peer-deps
function MyBbsList() {
  let history = useNavigate();
  const [bbslist, setBbslist] = useState([]); // 게시판은 배열로 넘어오니까
  const [choice, setChoice] = useState("");
  const [search, setSearch] = useState("");
  const [profile, setProfile] = useState("");
  //paging hook
  const [page, setPage] = useState(1);
  const [totalCnt, setTotalCnt] = useState(0);

  const [id, setId] = useState("");
  const [value, setValue] = React.useState("one");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // login 되어 있는지 검사
  useEffect(() => {
    let login = JSON.parse(localStorage.getItem("login"));
    if (login !== undefined) {
      // 빈칸이 아닐때

      setId(login.id);
      setProfile(login.profile);
    } else {
      // alert('로그인해 주십시오');
      history("/login");
    }
  }, [history]);

  function getBbslist(choice, search, page) {
    axios
      .get("http://118.67.132.98:3000/myBbslist", { params: { choice: choice, search: search, pageNumber: page, id: id } })
      .then(function(resp) {
        //console.log(resp.data);
        setBbslist(resp.data.list); // map을 return하기 때문(map 안에 list있음)
        setTotalCnt(resp.data.cnt);
        console.log(bbslist);
      })
      .catch(function(err) {
        alert(err);
      });
  }

  function pageChange(page) {
    setPage(page);
    getBbslist(choice, search, page - 1);
  }

  function searchBtn() {
    getBbslist(choice, search, 0);
  }

  const style = {
    width: "100%",
    maxWidth: 360,
    bgcolor: "background.paper",
  };
  useEffect(
    function() {
      if (id) {
        getBbslist("", "", 0); // 실행할 내용 => 컴포넌트가 처음으로 마운트되었을때 실행. 이경우에만 실행되고 다른 경우는 실행 안되므로 초기에 한번만 실행시
      }
      // 시킬때 이런 식으로 사용, 처음 들어오면 검색어와 페이징이 안들어옴
    },
    [id]
  ); // 한번만 호출
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
    history("mybbsList");
  };
  const gofree = () => {
    history("myfreebbsList");
  };

  /*   if (bbslist.length > 0) { */
  return (
    <>
      <Table bordered hover>
        <colgroup>
          <col width="70" />
          <col width="600" />
          {/*  <col width="100" /> */}
          <col width="100" />
          <col width="130" />
          <col width="130" />
        </colgroup>
        <thead>
          <tr>
            <th>번호</th>
            <th>제목</th>
            {/*    <th>조회수</th> */}
            <th>모집인원</th>
            <th>날짜</th>
            <th>작성자</th>
          </tr>
        </thead>

        <tbody>
          {bbslist.length ? (
            bbslist.map(function(bbs, i) {
              return (
                <tr key={i}>
                  <td align="center">{i + 1}</td>
                  {/*  <td align="left">
                      <Link to={`/partybbsdetail/${bbs.partySeq}`}> {bbs.title}</Link>
                    </td> */}
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
                      {/* {bbs.imageurl && bbs.imageurl !== "" && bbs.imageurl !== "null" ? (
                        <img
                        src= {bbs.imageurl}
                          alt="free image"
                          style={{
                            width: 40,
                            height: "auto",
                            objectFit: "cover",
                            objectPosition: "center",
                          }}
                        />
                      ) : null} */}
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
                  {/*      <td align="center">{bbs.readcount}</td> */}
                  <td align="center">{bbs.people}</td>
                  <td align="center">{bbs.wdate.substring(0, 10)}</td>
                  <td align="center">
                  {/* {bbs.imageurl && bbs.imageurl !== "" && bbs.imageurl !== "null" ? (
                    <img  src={bbs.imageurl} style={{ width: "20px", height: "20px", borderRadius: "50%" }} />): null} */}
                    {bbs.id}
                    
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan={6}>글이 없습니다.</td>
            </tr>
          )}
        </tbody>
      </Table>

      <div className="gamssagi2">
        <div className="searchs">
          <select value={choice} onChange={(e) => setChoice(e.target.value)}>
            <option value="">검색</option>
            <option value="title">제목</option>
            <option value="content">내용</option>
            <option value="writer">작성자</option>
          </select>
          &nbsp;
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="검색어" />
          &nbsp;
          <Button variant="success" size="sm" onClick={searchBtn}>
            검색
          </Button>
        </div>

        <Pagination activePage={page} itemsCountPerPage={10} totalItemsCount={totalCnt} pageRangeDisplayed={5} prevPageText={"이전"} nextPageText={"다음"} onChange={pageChange} />

        <br />
      </div>
    </>
  );
}

export default MyBbsList;
