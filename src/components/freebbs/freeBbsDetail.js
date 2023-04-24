// import axios from "axios";
// import { useEffect, useState } from "react";

// function Detail(props) {
//     const [bbs, setBbs] = useState([]);

//     useEffect(() => {
//         const bbsSeq = parseInt(props.children.props.match.params.bbsSeq); // URL 파라미터에서 게시글 고유값 가져오기
//         axios.get('http://localhost:3000/getBbs', {
//             params: {
//                 bbsSeq: bbsSeq
//             }
//         })
//             .then(response => {
//                 console.log(bbsSeq);
//                 console.log(response.data);
//                 setBbs(response.data);
//             })
//             .catch(error => {
//                 console.log(error);
//             })
//     }, [props.children.props.match.params.bbsSeq]); // 의존성 배열에 bbsSeq 추가

//     console.log(bbs);

//     return (
//         <div>
//             <h2>{bbs.title}</h2>
//             <p>{bbs.content}</p>
//         </div>
//     );
// }

// export default Detail;
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function FreeBbsDetail() {
  const [bbs, setBbs] = useState({});
  const { bbsSeq } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:3000/freeBbsDetail/${bbsSeq}`)
      .then((response) => {
        setBbs(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [bbsSeq]);

  return (
    <div>
      <h2>{bbs.title}</h2>
      <h4>{bbs.author}</h4>
      <p>{bbs.content}</p>
    </div>
  );
}

export default FreeBbsDetail;
