import Pagination from "react-js-pagination";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function FreeBbsList() {
  //로그인관련

  const [id, setId] = useState("");
  const [auth, setAuth] = useState();

  const isLogin = localStorage.getItem("login");

  useEffect(() => {
    if (isLogin == null) {
      return;
    } else {
      const login = JSON.parse(isLogin);
      setId(login.id);
      setAuth(login.auth);
    }
  }, [isLogin]);

  const [freelist, setFreelist] = useState([]);

  const [choice, setChoice] = useState();
  const [search, setSearch] = useState();
  const [tag, setTag] = useState();

  // paging
  const [page, setPage] = useState(1);
  const [start, setStart] = useState(0);
  const [totalCnt, setTotalCnt] = useState(0);

  function getFreelist() {
    axios
      .get("http://localhost:3000/freeBbslist", {
        params: { choice: choice, search: search, start: start, tag: tag },
      })
      .then(function (resp) {
        setFreelist(resp.data);
      })
      .catch(function (err) {
        alert(err);
      });
  }

  function getFreecnt() {
    if (!isLogin) {
      return;
    }
    axios
      .get("http://localhost:3000/cntFreeBbs", {
        params: {
          choice: choice,
          search: search,
          tag: tag,
        },
      })
      .then(function (resp) {
        setTotalCnt(resp.data);
      })
      .catch(function (err) {
        alert(err);
      });
  }

  function searchBtn() {
    getFreelist(choice, search);
  }

  function pageChange(page) {
    setPage(page);
    setStart((page - 1) * 20);
  }
  useEffect(() => {
    getFreelist();
    getFreecnt();
  }, [start, totalCnt, tag, choice]);

  return (
    <div>
      <br />
      <button value={""} onClick={(e) => setTag(e.target.value)}>
        전체
      </button>
      <button value={10} onClick={(e) => setTag(e.target.value)}>
        잡담
      </button>
      <button value={1} onClick={(e) => setTag(e.target.value)}>
        농구
      </button>
      <button value={2} onClick={(e) => setTag(e.target.value)}>
        축구
      </button>
      <button value={3} onClick={(e) => setTag(e.target.value)}>
        야구
      </button>
      <button value={4} onClick={(e) => setTag(e.target.value)}>
        예능
      </button>
      <button value={5} onClick={(e) => setTag(e.target.value)}>
        드라마/영화
      </button>
      <button value={6} onClick={(e) => setTag(e.target.value)}>
        게임
      </button>
      <button value={7} onClick={(e) => setTag(e.target.value)}>
        음식
      </button>
      <a href="#">내가 좋아한 게시물</a>
      <br />
      <div>
        <table border="1" align="center">
          <colgroup>
            <col width={"80px"} />
            <col width={"500px"} />

            <col width={"100px"} />
            <col width={"100px"} />
            <col width={"100px"} />
          </colgroup>
          <thead>
            <tr>
              <th>글번호</th>
              <th>제목</th>

              <th>작성일</th>
              <th>조회수</th>
              <th>좋아요 수</th>
            </tr>
          </thead>
          <tbody>
            {freelist && freelist.length ? (
              freelist.map(function (free, i) {
                return (
                  <tr key={i}>
                    <td>{free.bbsSeq}</td>
                    <td>
                      <div
                        style={{
                          width: "100%",
                          height: "50px",
                          overflow: "hidden",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        {free.image !== null ? (
                          <img
                            src={`http://localhost:3000/upload/freebbs/${free.image}`}
                            alt="free image"
                            style={{
                              width: 40,
                              height: "auto",
                              objectFit: "cover",
                              objectPosition: "center",
                            }}
                          />
                        ) : null}
                        &nbsp;&nbsp;<Link to={`/freeBbsDetail/${free.bbsSeq}`}>{free.title}</Link>{" "}
                      </div>
                    </td>

                    <td>{free.wdate.substring(0, 10)}</td>
                    <td>{free.readcount}</td>
                    <td>{free.likey}</td>
                  </tr>
                );
              })
            ) : (
              <td colSpan={6}>작성된 글이 없습니다</td>
            )}
          </tbody>
        </table>
        <br />
        <Pagination activePage={page} itemsCountPerPage={20} totalItemsCount={totalCnt} pageRangeDisplayed={5} prevPageText={"이전"} nextPageText={"다음"} onChange={pageChange} />
        {auth != null && <Link to="/freeBbsWrite">글 작성</Link>}
        <select value={choice} onChange={(e) => setChoice(e.target.value)}>
          <option>검색</option>
          <option value="title">제목</option>
          <option value="content">내용</option>
          <option value="writer">작성자</option>
        </select>
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="검색어" />
        &nbsp;
        <button onClick={searchBtn}>검색</button>
        <br />
        <br />
        <br />
      </div>
    </div>
  );
}

export default FreeBbsList;
