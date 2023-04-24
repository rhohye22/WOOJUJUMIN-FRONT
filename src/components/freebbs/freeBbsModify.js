import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function FreeBbsModify() {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });
  const { title, content } = formData;
  const { bbsSeq } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`/api/freeBbs/${bbsSeq}`)
      .then((response) => {
        setFormData({
          title: response.data.title,
          content: response.data.content,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, [bbsSeq]);

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    axios
      .put(`/api/freeBbs/${bbsSeq}`, formData)
      .then((response) => {
        navigate(`/freeBbsDetail/${bbsSeq}`);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onCancel = () => {
    navigate(-1);
  };

  return (
    <div>
      <h2>글 수정</h2>
      <form onSubmit={onSubmit}>
        <div>
          <label>제목</label>
          <input
            type="text"
            name="title"
            value={title}
            onChange={onChange}
          />
        </div>
        <div>
          <label>내용</label>
          <textarea name="content" value={content} onChange={onChange} />
        </div>
        <button type="submit">수정</button>
        <button type="button" onClick={onCancel}>
          취소
        </button>
      </form>
    </div>
  );
}

export default FreeBbsModify;
