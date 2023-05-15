import { useEffect, useState } from "react";
import axios from "axios";
import defaultimg from "../image/defaultnuill.png";
import { useNavigate } from "react-router-dom";
import "./crawlingcss.css";
import mainimg from "./popcorn.jpg";
import moviepage from "./moviepage.png";

function MovieCrawling() {
  let navigate = useNavigate();

  const [movielist, setMovieList] = useState([]);
  const [imageslist, setImageslist] = useState([]);
  const [loading, setLoading] = useState(false);
  const [talks, setTalks] = useState([]);
  const [comment, setComment] = useState("");

  const [alltalk, setAlltalk] = useState([]);
  const [indexCom, setIndexCom] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get("http://localhost:3000/moviechart", { params: {} })
        .then(function(res) {
          console.log(res.data.movie);
          setMovieList(res.data.movie);
          setImageslist(res.data.images);
          // alert(res.data.images);
          // alert(loading);
        })
        .catch(function(err) {
          alert(err);
        });
    };

    const talkData = async () => {
      await axios
        .get("http://localhost:3000/alltalkcomment", { params: { category: 1 } })
        .then(function(res) {
          console.log(res.data);
          console.log(res.data.slice(0, 10));
          setAlltalk(res.data);
          // setTalks(res.data.slice(0, 10));
          // setTalks(res.data.slice(indexCom, indexCom + 10));
          setTalks(res.data.slice(0, 10));
          // setIndexCom(indexCom + 1);
        })
        .catch(function(err) {
          alert(err);
        });
    };

    fetchData();
    talkData();
  }, []);

  let importimg = [];
  // let indexCom = 1;

  function MovieList(props) {
    const { movies, images } = props;
    let imagePath = [];

    // console.log("길이" + imageslist.length);

    if (images.length === 0) {
      return (
        <div>
          <p>이미지를 불러오고 있습니다...</p>
        </div>
      );
    }

    imageslist.map((img, index) => {
      let imageload = "";
      // console.log("이미지경로" + imageslist[index]);
      imageload = imageslist[index].split("\\");
      // console.log("스플릿" + imageload);
      importimg.push(imageload[imageload.length - 1]);
    });

    // importimg.map((img, index) => {
    //     imagePath.push(require('../crawlingimages/' + importimg[index]));

    // })

    importimg.map((img, index) => {
      try {
        imagePath.push(require("../crawlingimages/" + importimg[index]));
      } catch (error) {
        imagePath.push(defaultimg); // 이미지 대신 null 값을 추가합니다.
      }
    });

    console.log(imagePath);
    setLoading(false);

    function dot3(msg) {
      return msg.trim().length > 10 ? msg.substring(0, 10) + "..." : msg;
    }

    return (
      <div className="movieAll">
        {movies != null && images != null ? (
          movies.map((movie, i) => (
            <div key={i} className="movieOne">
              <h3 className="movienum">
                <span>No.</span>
                {i + 1}
              </h3>
              <img src={imagePath[i]} alt={movie} />
              <h3>{dot3(movie.split(":")[0])}</h3>
              <h4>{"예매율｜" + movie.split(":")[1]}</h4>
              <h4>{movie.split(":")[2]}</h4>
            </div>
          ))
        ) : (
          <div>내용을 불러오고 있습니다.</div>
        )}
      </div>
    );
  }

  // function Talklist(props) {

  //     const { talk } = props;

  //     return (
  //         <div>
  //             <h6>일단은 위치 미정</h6>
  //             {talk.map((talk, index) => (
  //                 <div>
  //                     <div>
  //                         <p>{talk.talkid}</p>
  //                         <p>{talk.talkcomment}</p>
  //                         <p>{talk.wdate.substring(0, 16)}</p>
  //                     </div>
  //                 </div>
  //             ))}
  //         </div>
  //     )
  // }

  function loginfnc() {
    // alert("확인용");
    if (localStorage.getItem("login") === null) {
      alert("로그인 후 작성해주세요!");
      navigate("/login");
    }
  }

  // let startIndex = indexCom * 10;
  // let endIndex = alltalk.length - talks.length >= 10 ? (indexCom + 1) * 10 : alltalk.length;

  function commentSubmit(e) {
    // alert("확인용");

    // console.log(localStorage.getItem("login"));
    e.preventDefault();
    if (typeof comment === "string" && comment.trim().length < 3) {
      alert("두 글자 이상으로 작성해주세요");
      return;
    }

    const loginData = JSON.parse(localStorage.getItem("login"));
    const id = loginData.id;

    // alert(id);

    axios
      .post("http://localhost:3000/talkcomment", null, { params: { talkid: id, talkcomment: comment, category: 1 } })
      .then(function(res) {
        // alert(res.data);
        if (res.data === "YES") {
          const fetchTalkData = async () => {
            try {
              const res = await axios.get("http://localhost:3000/alltalkcomment", { params: { category: 1 } });
              setTalks(res.data.slice(0, 10));
              setComment("");
              setIndexCom(1);
              // console.log( "다시 수정"+indexCom);
              if (indexCom > 1) {
                // alert("확인");
                // setIndexCom(1);
                // document.getElementById("more-btn").style.display = "block";
              }
              console.log(indexCom + "fd");
            } catch (err) {
              alert(err);
            }
          };

          fetchTalkData();
        }
      })
      .catch(function(err) {
        alert(err);
      });
  }

  // enter 누르면 입력되게 되는 함수
  const activeEnter = (e) => {
    if (e.key === "Enter") {
      commentSubmit(e);
    }
  };

  const loadMoreTalks = async () => {
    // const totalPage = Math.floor(alltalk.length / 10) + (alltalk.length % 10 > 0 ? 1 : 0);
    // console.log("길이확인" + totalPage);

    const numLoadedComments = document.querySelectorAll(".comment-box").length;
    console.log(numLoadedComments);

    await axios
      .get("http://localhost:3000/alltalkcomment", { params: { category: 1 } })
      .then((res) => {
        // const newTalks = res.data.slice((indexCom*10)+1, (indexCom)*20);
        // setTalks([...talks.slice(0, 10), ...newTalks]);
        let startIndex = indexCom * 10;
        let endIndex = alltalk.length - talks.length >= 10 ? (indexCom + 1) * 10 : alltalk.length;
        console.log(indexCom + "indexCom");
        console.log(startIndex + "startindex");
        console.log(endIndex + "endIndex");
        console.log(alltalk.length / 10);
        const newTalks = res.data.slice(startIndex, endIndex);

        if (endIndex >= alltalk.length) {
          setIndexCom(1);
          // setLoading(true);
          console.log("초기화 확인용" + indexCom);
          // endIndex가 배열의 인덱스 범위를 벗어난 경우 버튼을 숨김
          document.getElementById("more-btn").disabled = true;
          // document.getElementById("more-btn").style.display = "none";
        }

        setTalks([...talks, ...newTalks]);
        setIndexCom(indexCom + 1);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div className="allcontent">
      <div>
        <img src={moviepage} alt="무비이미지" className="mainimg" />
        {/*   <img src={mainimg} alt="무비이미지" className="mainimg" /> */}
      </div>
      <h2 className="page">CGV 상영작</h2>
      {/* {loading ? (<p>LOADING...</p>) : (<MovieList movies={movielist} images={imageslist} />)} */}
      <MovieList movies={movielist} images={imageslist} />
      {/* <Talklist talk={talks} /> */}

      <div className="talkList">
        <div className="talktitle">
          <h3>영화 한줄 톡!</h3>
        </div>
        <textarea
          onClick={loginfnc}
          value={comment}
          onChange={(e) => {
            setComment(e.target.value);
          }}
          onKeyDown={activeEnter}
          className="talkinsert"
          placeholder="영화에 대한 톡을 입력해주세요. &#13;&#10;무관한 내용은 삭제 될 수 있습니다."
        ></textarea>
        <div className="subinform">
          <button type="submit" onClick={commentSubmit} className="btnsub">
            등록
          </button>
          <p className="count">{comment.length}/300</p>
        </div>
        <div className="allcomment">
          {talks.map((talk, index) => (
            <div className="comment-box" key={index + 1}>
              <p>{talk.talkid}</p>
              <p>{talk.talkcomment}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="morebtnAll">
        {alltalk.length === 0 && <p>첫 코멘트를 달아주세요!</p>}
        {alltalk.length > 0 && (
          <button onClick={loadMoreTalks} id="more-btn">
            더보기 ∨
          </button>
        )}
      </div>
      {/* {talks.map((talk, index) => (
                <div>
                    <div key={index}>
                        <p>{talk.talkid}</p>
                        <p>{talk.talkcomment}</p>
                        <p>{talk.wdate.substring(0, 16)}</p>
                    </div>
                </div>
            ))} */}
      {/* <img src={imagePath[1]} alt="테스트용" /> */}
    </div>
  );
}
export default MovieCrawling;
