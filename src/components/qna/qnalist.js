import React, { useEffect, useLayoutEffect, useState } from "react";
import axios from "axios";
import Pagination from "react-js-pagination";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import "./page.css";

function Qnalist() {
  const navigate = useNavigate();
  const [id, setId] = useState("");

  const isLogin = localStorage.getItem("login");

  const [qnalist, setQnalist] = useState([]);

  // paging
  const [page, setPage] = useState(1);
  const [start, setStart] = useState(0);
  const [totalCnt, setTotalCnt] = useState(0);

  useEffect(() => {
    if (isLogin == null) {
      alert("로그인해 주십시오");
      navigate("/login"); // 로그인 페이지로 이동
    } else {
      const login = JSON.parse(isLogin);
      setId(login.id);
    }
  }, [navigate, isLogin]);

  function getQnalist() {
    if (!isLogin) {
      return;
    }
    axios
      .get("http://118.67.132.98:3000/qnalist", {
        params: {
          id: id,
          start: start,
        },
      })
      .then(function(resp) {
        setQnalist(resp.data);
      })
      .catch(function(err) {
        alert(err);
      });
  }

  function getQnacnt() {
    if (!isLogin) {
      return;
    }
    axios
      .get("http://118.67.132.98:3000/cntqna", {
        params: {
          id: id,
        },
      })
      .then(function(resp) {
        setTotalCnt(resp.data);
      })
      .catch(function(err) {
        alert(err);
      });
  }
  useEffect(() => {
    if (id) {
      getQnalist();
      getQnacnt();
    }
  }, [id, start, totalCnt]);

  function pageChange(page) {
    setPage(page);
    setStart((page - 1) * 10);
  }

  return (
    <div className="pnapage">
      <br /> <br />
      <h3>사용문의</h3>
      <br /> <br />
      <div className="qnalist">
        <br />

        <Table responsive hover>
          <colgroup>
            <col width="100" />
            <col width="600" />
            <col width="100" />
            <col width="100" />
          </colgroup>
          <thead>
            <tr>
              <th>문의유형</th>
              <th>제목</th>
              <th>작성날짜</th>
              <th>작성자</th>
            </tr>
          </thead>
          <tbody>
            {qnalist && qnalist.length ? (
              qnalist.map(function(qna, i) {
                return (
                  <tr key={i}>
                    <td>{qna.qtype}</td>
                    <td align="left">
                      {qna.ansdate ? <span>[답변완료] </span> : <span>[답변대기중] </span>}
                      <div
                        style={{
                          width: "100%",
                          height: "50px",
                          overflow: "hidden",
                          display: "flex",
                          alignItems: "left",
                        }}
                        onClick={() => navigate(`/qnadetail/${qna.qnaSeq}`)}
                      >
                        {" "}
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
                          {qna.title}
                        </div>
                      </div>
                    </td>
                    <td>{qna.wdate.substring(0, 10)}</td>
                    <td>{qna.id}</td>
                  </tr>
                );
              })
            ) : (
              <td colSpan={3}>작성된 문의글이 없습니다</td>
            )}
          </tbody>
        </Table>

        <br />

        <Pagination activePage={page} itemsCountPerPage={10} totalItemsCount={totalCnt} pageRangeDisplayed={5} prevPageText={"이전"} nextPageText={"다음"} onChange={pageChange} />

        <br />

        <Link to="/qnawrite">
          <Button variant="success" size="sm">
            글 작성
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default Qnalist;
