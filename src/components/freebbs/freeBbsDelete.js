import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const FreeBbsDelete = () => {
  const navigate = useNavigate();
  const { bbsSeq } = useParams();
  const [title, setTitle] = useState('');

  useEffect(() => {
    axios.get(`/api/bbs/${bbsSeq}`)
      .then(response => {
        setTitle(response.data.title);
      })
      .catch(error => {
        console.log(error);
      });
  }, [bbsSeq]);

  const handleDelete = () => {
    axios.delete(`/api/bbs/${bbsSeq}`)
      .then(response => {
        navigate('/freeBbsList');
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handleCancel = () => {
    navigate(`/freeBbsDetail/${bbsSeq}`);
  };

  return (
    <div>
      <h2>게시글 삭제</h2>
      <p>{title}을(를) 삭제하시겠습니까?</p>
      <button onClick={handleDelete}>삭제</button>
      <button onClick={handleCancel}>취소</button>
    </div>
  );
};

export default FreeBbsDelete;
