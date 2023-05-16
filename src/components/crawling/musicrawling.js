import React, { useEffect, useState } from "react";
import axios from "axios";
import defaultimg from "../image/defaultnuill.png";
import { useNavigate } from "react-router-dom";
import mainimg from "./piano.jpg";
import musicpage from "./musicpage.png";
import "./crawlingcss.css";

function Musiccrawling() {
  // const [musicdata, setMusicdata] = useState([]);

  let navigate = useNavigate();

  const [titles, setTitles] = useState([]);
  const [singers, setSinger] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [imageslist, setImageslist] = useState([]);

  const [talks, setTalks] = useState([]);
  const [comment, setComment] = useState([]);

    const [alltalk, setAlltalk] = useState([]);
    const [indexCom, setIndexCom] = useState(1);

    const [firsrDel, setFirstDel] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const path = "/woojujumin/WOOJUJUMIN-FRONT/src/components/crawlingimages/musicimages";
      await axios
        .get("http://118.67.132.98:3000/musicchart", { params: {path:path} })
        .then(function(res) {
          console.log(res.data);
          console.log(res.data.sendsingers);
          setTitles(res.data.sendtitles);
          setSinger(res.data.sendsingers);
          setAlbums(res.data.sendalbums);
          setImageslist(res.data.images);
        })
        .catch(function(err) {
          alert(err);
        });
    };

    const talkData = async () => {
      await axios
        .get("http://118.67.132.98:3000/alltalkcomment", { params: { category: 4 } })
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

  function Musiclist(props) {
    const { titles, singers, albums, images } = props;

    // let imagePath = [];

    // if (images.length === 0) {
    //   return (
    //     <div>
    //       <p>이미지를 불러오고 있습니다...</p>
    //     </div>
    //   );
    // }

    // imageslist.map((img, index) => {
    //   let imageload = "";
    //   imageload = imageslist[index].split("\\");
    //   importimg.push(imageload[imageload.length - 1]);
    // });

    // importimg.map((img, index) => {
    //   try {
    //     imagePath.push(require("../crawlingimages/musicimages/" + importimg[index]));
    //   } catch (error) {
    //     imagePath.push(defaultimg); // 이미지 대신 null 값을 추가합니다.
    //   }
    // });

    // console.log("여기까지 오는거 확인"+singers);
    // console.log("여기까지 오는거 확인"+albums);

    return (
      <div className="musicOne">
        <table id="musictable">
          <colgroup>
            <col width={100} />
            <col width={600} />
            <col width={300} />
            <col width={400} />
          </colgroup>
          <thead>
            <tr>
              <td>순위</td>
              <td>제목</td>
              <td>가수</td>
              <td>앨범</td>
            </tr>
          </thead>
          <tbody>
            {titles.map((title, i) => (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>
                  <img src={imageslist[i]} alt={title} style={{width:"100px"}}/>
                  <p className="songname">{title}</p>
                </td>
                <td>
                  <p>{singers[i]}</p>
                </td>
                <td>
                  <p>{albums[i]}</p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* {titles.map((title, i) => (
                    <div key={i}>
                        <p>{i + 1}</p>
                        <img src={imagePath[i]} alt={title} />
                        <h2>{title}</h2>
                        <h2>{singers[i]}</h2>
                        <h2>{albums[i]}</h2>
                    </div>
                ))} */}
      </div>
    );
  }

  function loginfnc() {
    // alert("확인용");
    if (localStorage.getItem("login") === null) {
      alert("로그인 후 작성해주세요!");
      navigate("/login");
    }
  }

  function commentSubmit(e) {
    // alert("확인용");

    // console.log(localStorage.getItem("login"));

        e.preventDefault();
        setFirstDel(true);

        if (typeof comment === "string" && comment.trim().length < 3) {
            alert("두 글자 이상으로 작성해주세요");
            return;
        }

    const loginData = JSON.parse(localStorage.getItem("login"));
    const id = loginData.id;

    // alert(id);

        axios.post("http://118.67.132.98:3000/talkcomment", null, { params: { "talkid": id, "talkcomment": comment, "category": 4 } })
            .then(function (res) {
                // alert(res.data);
                if (res.data === "YES") {
                    const fetchTalkData = async () => {
                        try {
                            const res = await axios.get("http://118.67.132.98:3000/alltalkcomment", { params: { "category": 4 } });
                            setTalks(res.data.slice(0, 10));
                            setComment("");
                            setIndexCom(1);
                            // console.log( "다시 수정"+indexCom);
                            if (indexCom > 1) {
                                // alert("확인");
                                // setIndexCom(1);
                                // document.getElementById("more-btn").style.display = "block";
                                document.getElementById("more-btn").disabled = false;
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
      .get("http://118.67.132.98:3000/alltalkcomment", { params: { category: 4 } })
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
            {/* const { titles, singres, albums, images } = props; */}
            <div>
                <img src={musicpage} alt="mainimg" className="mainimg" />
            </div>
            <h2 className="page">멜론 TOP 50</h2>
            <Musiclist titles={titles} singers={singers} albums={albums} images={imageslist} />

            <div className="talkList">
                <div className="talktitle">
                    <h3>노래 한줄 톡!</h3>
                </div>
                <textarea onClick={loginfnc} value={comment} onChange={(e) => { setComment(e.target.value) }}
                    onKeyDown={activeEnter} className="talkinsert" placeholder="노래에 대한 톡을 입력해주세요. &#13;&#10;무관한 내용은 삭제 될 수 있습니다."></textarea>
                <div className="subinform">
                    <button type="submit" onClick={commentSubmit} className="btnsub">등록</button>
                    <p className="count">{comment.length}/300</p>
                </div>
                <div className="allcomment">
                    {alltalk.length === 0 && !firsrDel && <p>첫 코멘트를 달아주세요!</p>}
                    {talks.map((talk, index) => (
                        <div className="comment-box" key={index + 1}>
                            <p>
                                {talk.talkid}
                            </p>
                            <p>
                                {talk.talkcomment}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
            <div className="morebtnAll">
                {alltalk.length === 0 && <button id="more-btn" disabled>더보기 ∨</button>}
                {alltalk.length > 0 && <button onClick={loadMoreTalks} id="more-btn">더보기 ∨</button>}
            </div>

        </div>
    )
}
export default Musiccrawling;
