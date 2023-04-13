import React, { useEffect, useState } from "react";
import axios from "axios";
import Pagination from "react-js-pagination";
import { useNavigate } from "react-router-dom";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import "./page.css";

function Qnalist() {
  const [id, setId] = useState("");
  const [nickname, setNickname] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const isLogin = localStorage.getItem("login");
    if (isLogin == null) {
      alert("로그인해 주십시오");
      navigate("/login"); // 로그인 페이지로 이동
    } else {
      let login = JSON.parse(localStorage.getItem("login"));
      setId(login.id);
      setNickname(login.nickname);
    }
  }, [navigate]);

  const [logState, setLogState] = useState();
  const [qnalist, setQnalist] = useState([]);

  // paging
  const [page, setPage] = useState(1);
  const [totalCnt, setTotalCnt] = useState(0);

  function getQnalist(page) {
    axios
      .get("http://localhost:3000/qnalist", { params: { id: id } })
      .then(function (resp) {
        // console.log(resp.data);
        // alert(JSON.stringify(resp.data[0]));

        setQnalist(resp.data.list);
        setTotalCnt(resp.data.cnt);
      })
      .catch(function (err) {
        alert(err);
      });
  }
  function pageChange(page) {
    setPage(page);
    getQnalist(page - 1);
  }

  useEffect(function () {
    getQnalist(0);
  }, []);
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
          {qnalist == null ? (
            <td colSpan={3}>작성된 문의글이 없습니다</td>
          ) : (
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
