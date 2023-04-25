import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useParams } from "react-router-dom";
import FreeBbsReply from "./freeBbsReply";
import FreeBbslikey from "./freeBbslikey";
import FreeBbsReadcount from "./freeBbsReadcount";

function FreeBbsDetail() {
  let navigate = useNavigate();

  const [freebbs, setFreeBbs] = useState({});
  const [loading, setLoading] = useState(false);

  //댓글
  const [replySeq, setReplySeq] = useState();
  const [content, setContent] = useState("");
  const [writer, setWriter] = useState("");
  const [memberSeq, setMemberSeq] = useState();

  //접속정보
  useEffect(function () {
    let login = JSON.parse(localStorage.getItem("login"));

    setWriter(login.id);
    setMemberSeq(login.memberSeq);
  }, []);

  let params = useParams();

  let bbsSeq = params.bbsSeq;
  const seqs = { memberSeq: memberSeq, bbsSeq: bbsSeq };

  const qnaData = async (bbsSeq) => {
    const response = await axios.get("http://localhost:3000/getfreeBbs", {
      params: { bbsSeq: bbsSeq },
    });
    setFreeBbs(response.data);

    setLoading(true); // 여기서 rendering 해 준다
  };

  useEffect(() => {
    qnaData(params.bbsSeq);
    setReplySeq(params.bbsSeq);
  }, [params.bbsSeq]);

  if (loading === false) {
    return <div>Loading...</div>;
  }

  const imageUrl = freebbs.image !== null ? `http://localhost:3000/upload/freebbs/${freebbs.image}` : null;

  const contentChange = (e) => {
    setContent(e.target.value);
  };

  //댓글쓰기
  function writeFreebbsReply() {
    if (content === undefined || content.trim() === "") {
      alert("댓글 내용을 입력해 주십시오");
      return;
    }

    axios
      .post("http://localhost:3000/writeFreeReply", null, {
        params: { writer: writer, replySeq: replySeq, content: content },
      })
      .then((res) => {
        console.log(res.data);
        if (res.data === "YES") {
          alert("성공적으로 등록되었습니다");
          navigate(`/freeBbsDetail/${replySeq}`);
          setContent("");
        } else {
          alert("등록되지 않았습니다");
        }
      })
      .catch(function (err) {
        alert(err);
      });
  }

  return (
    <div>
      <h2>제목 : {freebbs.title}</h2>
      <h2>작성자 : {freebbs.id}</h2>
      <h2>파일 : {freebbs.image}</h2>
      <FreeBbsReadcount seqs={seqs} />
      <br />
      {imageUrl !== null ? (
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
      ) : null}
      <p>내용 : {freebbs.content}</p>
      <p>멤시퀸스 : {memberSeq}</p>
      <FreeBbslikey seqs={seqs} />
      <br />
      <FreeBbsReply replySeq={replySeq} />
      <br />
      <label>
        댓글내용
        <input type="text" value={content} onChange={contentChange} />
      </label>
      <button type="submit" onClick={writeFreebbsReply}>
        작성하기
      </button>
      <br /> <br /> <br />
    </div>
  );
}

export default FreeBbsDetail;
