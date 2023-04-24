import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function FreeBbsDetail() {
  const [freebbs, setFreeBbs] = useState({});
  const [loading, setLoading] = useState(false);
  let params = useParams();
  const qnaData = async (bbsSeq) => {
    const response = await axios.get("http://localhost:3000/getfreeBbs", {
      params: { bbsSeq: bbsSeq },
    });
    setFreeBbs(response.data);

    setLoading(true); // 여기서 rendering 해 준다
  };

  useEffect(() => {
    qnaData(params.bbsSeq);
  }, [params.bbsSeq]);

  if (loading === false) {
    return <div>Loading...</div>;
  }

  const imageUrl = freebbs.image !== null ? `http://localhost:3000/upload/freebbs/${freebbs.image.substring(66)}` : null;

  return (
    <div>
      <h2>제목 : {freebbs.title}</h2>
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
    </div>
  );
}

export default FreeBbsDetail;
