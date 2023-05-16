import { useEffect, useState } from "react";
import axios from "axios";
import defaultimg from "../image/defaultnuill.png";
import { useNavigate } from "react-router-dom";
import mainimg from "./fes.jpg";
import localfesti from "./localfesti.png";

function Localeventcrawling() {
  let navigate = useNavigate();

  const [onepage, setOnepage] = useState([]);
  const [twopage, setTwopage] = useState([]);
  const [threepage, setThreepage] = useState([]);

  const [onetitles, setOnetitles] = useState([]);
  const [twotitles, setTwotitles] = useState([]);
  const [threetitles, setThreetitles] = useState([]);

  const [oneinform, setOneinfrom] = useState([]);
  const [twoinform, setTwoinfrom] = useState([]);
  const [threeinform, setThreeinfrom] = useState([]);

  const [onedates, setOnedates] = useState([]);
  const [twodates, setTwodates] = useState([]);
  const [threedates, setThreedates] = useState([]);

  const [oneimages, setOneimages] = useState([]);
  const [twoimages, setTwoimages] = useState([]);
  const [threeimages, setThreeimages] = useState([]);

  const [talks, setTalks] = useState([]);
  const [comment, setComment] = useState([]);

    const [alltalk, setAlltalk] = useState([]);
    const [indexCom, setIndexCom] = useState(1);

    const [firsrDel, setFirstDel] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const path = "/woojujumin/WOOJUJUMIN-FRONT/src/components/crawlingimages";
      await axios
        .get("http://118.67.132.98:3000/localevent", { params: {path:path} })
        .then(function(res) {
          console.log(res.data);
          setOnetitles(res.data.onepage.sendtitles);
          setOneinfrom(res.data.onepage.sendinformations);
          setOnedates(res.data.onepage.senddates);
          setOneimages(res.data.onepage.images);

          setTwotitles(res.data.twopage.sendtitles);
          setTwoinfrom(res.data.twopage.sendinformations);
          setTwodates(res.data.twopage.senddates);
          setTwoimages(res.data.twopage.images);

          setThreetitles(res.data.threepage.sendtitles);
          setThreeinfrom(res.data.threepage.sendinformations);
          setThreedates(res.data.threepage.senddates);
          setThreeimages(res.data.threepage.images);
        })
        .catch(function(err) {
          alert(err);
        });
    };

    const talkData = async () => {
      await axios
        .get("http://118.67.132.98:3000/alltalkcomment", { params: { category: 3 } })
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

  let importimgOne = [];
  let importimgTwo = [];
  let importimgThree = [];

  function FestivallistOne(props) {
    const { titles, informations, dates, images } = props;
    // let imagePath = [];

    // if (images.length === 0) {
    //   return (
    //     <div>
    //       <p>이미지를 불러오고 있습니다...</p>
    //     </div>
    //   );
    // }

    // oneimages.map((img, index) => {
    //   let imageload = "";
    //   imageload = oneimages[index].split("\\");
    //   importimgOne.push(imageload[imageload.length - 1]);
    // });

    // importimgOne.map((img, index) => {
    //     imagePath.push(require('../crawlingimages/' + importimgOne[index]));

    // })

    // importimgOne.map((img, index) => {
    //   try {
    //     imagePath.push(require("../crawlingimages/" + importimgOne[index]));
    //   } catch (error) {
    //     imagePath.push(defaultimg); // 이미지 대신 null 값을 추가합니다.
    //   }
    // });

    return (
      <div className="eventAll firstevent">
        {titles.map((title, i) => (
          <div key={i} className="eventOne">
            <img src={oneimages[i]} alt={title} />
            <div className="eventinform">
              <h3>{title}</h3>
              <p>{dot3(oneinform[i])}</p>
              {/* <p>{onedates[i]}</p> */}
              <p>{onedates[i].split("장")[0]}</p>
              <p>
                장소
                {(() => {
                  const str = onedates[i].split("장소")[1];
                  const index = str.indexOf("문의");
                  const result = str.slice(0, index);
                  // console.log(str);
                  return result;
                })()}
              </p>
              <p>
                문의
                {(() => {
                  const str = onedates[i].split("문의")[1];
                  const index = str.indexOf("문의");
                  const result = str.slice(0, index);
                  // console.log(str);
                  return result;
                })()}
              </p>
            </div>
          </div>
        ))}
      </div>
    );
  }

  function FestivallistTwo(props) {
    const { titles, informations, dates, images } = props;
    // let imagePath = [];

    // if (images.length === 0) {
    //   return (
    //     <div>
    //       <p>이미지를 불러오고 있습니다...</p>
    //     </div>
    //   );
    // }

    // twoimages.map((img, index) => {
    //   let imageload = "";
    //   imageload = images[index].split("\\");
    //   importimgTwo.push(imageload[imageload.length - 1]);
    // });

    // importimgTwo.map((img, index) => {
    //     imagePath.push(require('../crawlingimages/' + importimgTwo[index]));

    // })

    // importimgTwo.map((img, index) => {
    //   try {
    //     imagePath.push(require("../crawlingimages/" + importimgTwo[index]));
    //   } catch (error) {
    //     imagePath.push(defaultimg); // 이미지 대신 null 값을 추가합니다.
    //   }
    // });

    return (
      <div className="eventAll">
        {titles.map((title, i) => (
          <div key={i} className="eventOne">
            <img src={twoimages[i]} alt={title} />
            <div className="eventinform">
              <h3>{title}</h3>
              <p>{dot3(twoinform[i])}</p>
              <p>{onedates[i].split("장")[0]}</p>
              <p>
                장소
                {(() => {
                  const str = onedates[i].split("장소")[1];
                  const index = str.indexOf("문의");
                  const result = str.slice(0, index);
                  // console.log(str);
                  return result;
                })()}
              </p>
              <p>
                문의
                {(() => {
                  const str = onedates[i].split("문의")[1];
                  const index = str.indexOf("문의");
                  const result = str.slice(0, index);
                  // console.log(str);
                  return result;
                })()}
              </p>
            </div>
          </div>
        ))}
      </div>
    );
  }

  function FestivallistThree(props) {
    const { titles, informations, dates, images } = props;
    // let imagePath = [];

    // if (images.length === 0) {
    //   return (
    //     <div>
    //       <p>이미지를 불러오고 있습니다...</p>
    //     </div>
    //   );
    // }

    // threeimages.map((img, index) => {
    //   let imageload = "";
    //   imageload = threeimages[index].split("\\");
    //   importimgThree.push(imageload[imageload.length - 1]);
    // });

    // importimgThree.map((img, index) => {
    //     imagePath.push(require('../crawlingimages/' + importimgThree[index]));

    // })

    // importimgThree.map((img, index) => {
    //   try {
    //     imagePath.push(require("../crawlingimages/" + importimgThree[index]));
    //   } catch (error) {
    //     imagePath.push(defaultimg); // 이미지 대신 null 값을 추가합니다.
    //   }
    // });

    return (
      <div className="eventAll">
        {titles.map((title, i) => (
          <div key={i} className="eventOne">
            <img src={threeimages[i]} alt={title} />
            <div className="eventinform">
              <h3>{title}</h3>
              <p>{dot3(threeinform[i])}</p>
              <p>{onedates[i].split("장")[0]}</p>
              <p>
                장소
                {(() => {
                  const str = onedates[i].split("장소")[1];
                  const index = str.indexOf("문의");
                  const result = str.slice(0, index);
                  // console.log(str);
                  return result;
                })()}
              </p>
              <p>
                문의
                {(() => {
                  const str = onedates[i].split("문의")[1];
                  const index = str.indexOf("문의");
                  const result = str.slice(0, index);
                  // console.log(str);
                  return result;
                })()}
              </p>
            </div>
          </div>
        ))}
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

    function dot3(msg) {
        return msg.trim().length > 300 ? msg.substring(0, 300) + "..." : msg;
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

        axios.post("http://118.67.132.98:3000/talkcomment", null, { params: { "talkid": id, "talkcomment": comment, "category": 3 } })
            .then(function (res) {
                // alert(res.data);
                if (res.data === "YES") {
                    const fetchTalkData = async () => {
                        try {
                            const res = await axios.get("http://118.67.132.98:3000/alltalkcomment", { params: { "category": 3 } });
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
      .get("http://118.67.132.98:3000/alltalkcomment", { params: { category: 3 } })
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
        {/*  <img src={mainimg} alt="mainimg" className="mainimg" /> */}
        <img src={localfesti} alt="mainimg" className="mainimg" />
      </div>
      <h2 className="page">지역축제</h2>
      <FestivallistOne titles={onetitles} informations={oneinform} dates={onedates} images={oneimages} />
      <FestivallistTwo titles={twotitles} informations={twoinform} dates={twodates} images={twoimages} />
      <FestivallistThree titles={threetitles} informations={threeinform} dates={threedates} images={threeimages} />

            <div className="talkList_addop">
                <div className="talktitle">
                    <h3>지역행사 한줄 톡!</h3>
                </div>
                <textarea onClick={loginfnc} value={comment} onChange={(e) => { setComment(e.target.value) }}
                    onKeyDown={activeEnter} className="talkinsert" placeholder="행사에 대한 톡을 입력해주세요. &#13;&#10;무관한 내용은 삭제 될 수 있습니다."></textarea>
                <div className="subinform" style={{ overflow: "hidden", marginBottom: "5px", marginRight: "10px", marginTop: "5px" }}>
                    <button type="submit" onClick={commentSubmit} className="btnsub">등록</button>
                    <p className="count">{comment.length}/300</p>
                </div>
                <div className="allcomment">
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
                    {alltalk.length === 0 && !firsrDel && <p>첫 코멘트를 달아주세요!</p>}

                </div>
            </div>
            <div className="morebtnAll_addop">
                {alltalk.length === 0 && <button id="more-btn" disabled>더보기 ∨</button>}
                {alltalk.length > 0 && <button onClick={loadMoreTalks} id="more-btn">더보기 ∨</button>}
            </div>

      {/* <div className="talkList_addop">
                <h3>지역행사 한줄 톡!</h3>
                <textarea onClick={loginfnc} value={comment} onChange={(e) => { setComment(e.target.value) }}
                    onKeyDown={activeEnter} className="talkinsert" placeholder="행사에 대한 톡을 입력해주세요. &#13;&#10;무관한 내용은 삭제 될 수 있습니다."></textarea>
                <div className="subinform" style={{ overflow: "hidden" }}>
                    <button type="submit" onClick={commentSubmit} className="btnsub">등록</button>
                    <p className="count">{comment.length}/300</p>
                </div>
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
                {alltalk.length === 0 ? (<p>첫 코멘트를 달아주세요!</p>) : null}
                {alltalk.length > 0 && <button onClick={loadMoreTalks} id="more-btn">더보기</button>}
            </div> */}
    </div>
  );
}

export default Localeventcrawling;
