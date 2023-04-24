import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Qnawrite() {
  let navigate = useNavigate();

  const [id, setId] = useState("");
  const [qtype, setQtype] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const writeQna = () => {
    if (title === undefined || title.trim() === "") {
      alert("제목을 입력해 주십시오");
      return;
    }

    axios
      .post("http://localhost:3000/qnawrite", null, {
        params: { id: id, title: title, qtype: qtype, content: content },
      })
      .then((res) => {
        console.log(res.data);
        if (res.data === "YES") {
          alert("성공적으로 등록되었습니다");
          navigate("/qnalist"); // qnalist 이동
        } else {
          alert("등록되지 않았습니다");
        }
      })
      .catch(function (err) {
        alert(err);
      });
  };

  useEffect(function () {
    let login = JSON.parse(localStorage.getItem("login"));
    setId(login.id);
  }, []);

  return (
    <div>
      <h3>글쓰기</h3>

      <table align="center" border="1">
        <colgroup>
          <col width="100px" />
          <col width="500px" />
        </colgroup>
        <tbody>
          <tr>
            <th>아이디</th>
            <td>
              <input
                type="text"
                value={id}
                size="30"
                onChange={(e) => setId(e.target.value)}
                className="form-control form-control-lg"
                readOnly
              />
            </td>
          </tr>

          <tr>
            <th>문의유형</th>
            <td>
              <select value={qtype} onChange={(e) => setQtype(e.target.value)}>
                <option value="" disabled>
                  유형선택
                </option>
                <option value="회원관리">회원관리</option>
                <option value="게시글관리">게시글관리</option>
                <option value="파티관리">파티관리</option>
                <option value="오류신고">오류신고</option>
                <option value="기타">기타</option>
              </select>
            </td>
          </tr>

          <tr>
            <th>제목</th>
            <td>
              <input
                type="text"
                value={title}
                size="30"
                onChange={(e) => setTitle(e.target.value)}
                placeholder="제목기입"
              />
            </td>
          </tr>
          <tr>
            <th>내용</th>
            <td>
              <textarea
                rows="18"
                value={content}
                cols="32"
                onChange={(e) => setContent(e.target.value)}
                placeholder="내용기입"
              ></textarea>
            </td>
          </tr>
          <tr>
            <td colSpan="2">
              <button
                type="button"
                onClick={() => writeQna()}
                className="btn btn-primary"
              >
                글작성 완료
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Qnawrite;
