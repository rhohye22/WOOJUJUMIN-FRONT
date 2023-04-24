
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
//import { useAuth } from '../contexts/AuthContext';
import Pagination from "react-js-pagination";



function FreeBbsList() {




  //const { currentUser } = useAuth();
  const [list, setList] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalCnt, setTotalCnt] = useState(0);
  useEffect(() => {
    axios.get(`http://localhost:3000/getAllList?page=${page}&size=10`)
      .then(response => {
        setList(response.data.content);
        setTotalPages(response.data.totalPages);
      })
      .catch(error => {
        console.log(error);
      });
  }, [page]);

  const handlePageChange = (event, value) => {
    setPage(value);
  };
  
  function pageChange(page){
    setPage(page);
    setList( page-1);
}

  return (
    <div>
      <div style={{ float: "right" }}>
        { <Link to="/freeBbsWrite">글 작성</Link>}
        <select>
          <option>카테고리</option>
          <option value={"basketball"}>농구</option>
          <option value={"soccer"}>축구</option>
          <option value={"baseball"}>야구</option>
          <option value={"tvShow"}>예능</option>
          <option value={"dramaMovie"}>드라마/영화</option>
          <option value={"game"}>게임</option>
          <option value={"food"}>음식</option>
          <option value={"together"}>함께</option>
          <option value={"travel"}>탐사</option>
          <option value={"chat"}>잡담</option>
        </select>
      </div>
      <br />
      <br />
      <div>
        <table border="1" align="center">
          <colgroup>
            <col width={"120px"} />
            <col width={"500px"} />
            <col width={"100px"} />
            <col width={"100px"} />
            <col width={"100px"} />
            <col width={"100px"} />
          </colgroup>
          <thead>
            <tr>
              <th>글번호</th>
              <th>제목</th>
              <th>작성자</th>
              <th>작성일</th>
              <th>조회수</th>
              <th>좋아요 수</th>
            </tr>
          </thead>
          <tbody>
            {list.map(item => (
              <tr key={item.bbsSeq}>
                <td>{item.bbsSeq}</td>
                <td><Link to={`/freeBbsDetail/${item.bbsSeq}`}>{item.title}</Link></td>
                <td>{item.writer}</td>
                <td>{item.regDate}</td>
                <td>{item.readCount}</td>
                <td>{item.likeCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      
    <Pagination activePage={page}
       itemsCountPerPage={10}
       totalItemsCount={totalCnt}
       pageRangeDisplayed={5}
       prevPageText={"이전"}
       nextPageText={"다음"}
       onChange={pageChange}/>
      </div>
    </div>
  );
}

export default FreeBbsList;