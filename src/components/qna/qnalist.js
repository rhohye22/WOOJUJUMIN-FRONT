import React, { useEffect, useState } from "react";
import axios from "axios";
import Pagination from "react-js-pagination";
import { useNavigate } from "react-router-dom";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import "./page.css";

function Qnalist() {
  const [id, setId] = useState("");
  const [qnalist, setQnalist] = useState([]);

  // paging
  const [page, setPage] = useState(1);
  const [start, setStart] = useState(0);
  const [totalCnt, setTotalCnt] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    const isLogin = localStorage.getItem("login");
    if (isLogin == null) {
      alert("로그인해 주십시오");
      navigate("/login"); // 로그인 페이지로 이동
    } else {
      let login = JSON.parse(localStorage.getItem("login"));
      setId(login.id);
    }
  }, [navigate]);

  useEffect(() => {
    getQnalist();
    getQnacnt();
  }, [id, start]);

  function getQnalist() {
    axios
      .get("http://localhost:3000/qnalist", {
        params: {
          id: id,
          start: start,
        },
      })
      .then(function (resp) {
        console.log(resp.data);
        setQnalist(resp.data);
      })
      .catch(function (err) {
        alert(err);
      });
  }

  function getQnacnt() {
    axios
      .get("http://localhost:3000/cntqna", {
        params: {
          id: id,
        },
      })
      .then(function (resp) {
        setTotalCnt(resp.data);
      })
      .catch(function (err) {
        alert(err);
      });
  }

  function pageChange(page) {
    setPage(page);
    setStart((page - 1) * 10);
  }

  return (
    <div>
      <h2>게시판</h2>

      <br />

      <table border="1" align="center">
        <colgroup>
          <col width="70" />
          <col width="600" />
          <col width="100" />
        </colgroup>
        <thead>
          <tr>
            <th>번호</th>
            <th>제목</th>
            <th>작성자</th>
          </tr>
        </thead>
        <tbody>
          {qnalist && qnalist.length ? (
            qnalist.map(function (qna, i) {
              return (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td align="left">
                    <Link to={`/qnadetail/${qna.qnaSeq}`}>{qna.title}</Link>
                  </td>
                  <td>{qna.id}</td>
                </tr>
              );
            })
          ) : (
            <td colSpan={3}>작성된 문의글이 없습니다</td>
          )}
        </tbody>
      </table>

      <br />

      <Pagination
        activePage={page}
        itemsCountPerPage={10}
        totalItemsCount={totalCnt}
        pageRangeDisplayed={5}
        prevPageText={"이전"}
        nextPageText={"다음"}
        onChange={pageChange}
      />

      <br />

      <Link to="/qnawrite">글쓰기</Link>
    </div>
  );
}

export default Qnalist;
