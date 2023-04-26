//import Pagination from "react-js-pagination";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

function FreeBbsReply(props) {
  const [replylist, setReplylist] = useState([]);

  const [start, setStart] = useState(0);
  const [limit, setLimit] = useState(10);

  let replySeq = props.replySeq;

  function getReplylist() {
    axios
      .get("http://localhost:3000/freeReplyList", {
        params: { replySeq: replySeq, start: start, limit: limit },
      })
      .then(function (resp) {
        setReplylist(resp.data);
      })
      .catch(function (err) {
        alert(err);
      });
  }

  useEffect(() => {
    getReplylist();
  }, [replySeq, limit]);

  const handleLoadMore = () => {
    setLimit((prev) => prev + 10);
  };

  return (
    <div>
      <br />
      <div>
        <table border="1" align="center">
          <colgroup>
            <col width={"100px"} />
            <col width={"100px"} />
          </colgroup>
          <thead>
            <tr>
              {" "}
              <th>댓쓴이</th>
              <th>내용</th>
            </tr>
          </thead>
          <tbody>
            {replylist && replylist.length ? (
              replylist.map(function (reply, i) {
                return (
                  <tr key={i}>
                    <td>{reply.writer}</td>
                    <td>{reply.content}</td>
                  </tr>
                );
              })
            ) : (
              <td colSpan={2}>작성된 글이 없습니다</td>
            )}
            <button onClick={handleLoadMore}>Load More</button>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default FreeBbsReply;
