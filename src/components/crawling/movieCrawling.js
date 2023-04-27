
import { useEffect, useState } from "react";
import axios from 'axios';
import defaultimg from '../image/defaultnuill.png'
import { useNavigate } from "react-router-dom";

function MovieCrawling() {

    let navigate = useNavigate();

    const [movielist, setMovieList] = useState([]);
    const [imageslist, setImageslist] = useState([]);
    const [loading, setLoading] = useState(true);
    const [talks, setTalks] = useState([]);
    const [comment, setComment] = useState([]);

    const [alltalk, setAlltalk] = useState([]);
    const [indexCom, setIndecCom] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            await axios.get("http://localhost:3000/moviechart", { params: {} })
                .then(function (res) {
                    console.log(res.data.movie);
                    setMovieList(res.data.movie);
                    setImageslist(res.data.images);
                    // alert(res.data.images);
                    // alert(loading);

                })
                .catch(function (err) {
                    alert(err);
                })
        }

        const talkData = async () => {
            await axios.get("http://localhost:3000/alltalkcomment", { params: {} })
                .then(function (res) {
                    console.log(res.data);
                    console.log(res.data.slice(0, 10));
                    setAlltalk(res.data);
                    // setTalks(res.data.slice(0, 10));
                    setTalks(res.data.slice(indexCom, (indexCom + 1) * 10));
                    setIndecCom(indexCom + 1);

                })
                .catch(function (err) {
                    alert(err);
                })
        }

        fetchData();
        talkData();

    }, []);


    let importimg = [];

    function MovieList(props) {

        const { movies, images } = props;
        let imagePath = [];

        // console.log("길이" + imageslist.length);

        if (images.length === 0) {
            return (
                <div>
                    <p>이미지를 불러오고 있습니다...</p>
                </div>
            )
        }


        imageslist.map((img, index) => {
            let imageload = "";
            // console.log("이미지경로" + imageslist[index]);
            imageload = imageslist[index].split("\\");
            // console.log("스플릿" + imageload);
            importimg.push(imageload[imageload.length - 1]);
        })


        // importimg.map((img, index) => {
        //     imagePath.push(require('../crawlingimages/' + importimg[index]));

        // })

        importimg.map((img, index) => {
            try {
                imagePath.push(require('../crawlingimages/' + importimg[index]));
            } catch (error) {
                imagePath.push(defaultimg); // 이미지 대신 null 값을 추가합니다.
            }
        });


        setLoading(false);

        return (
            <div>
                {movies != null && images != null ? (
                    movies.map((movie, i) => (
                        <div key={i}>
                            <h2>{movie}</h2>

                            <img src={imagePath[i]} alt={movie} />
                        </div>
                    ))) : (<div>내용을 불러오고 있습니다.</div>)}
            </div>
        );

    }

    function Talklist(props) {

        const { talk } = props;

        return (
            <div>
                <h6>일단은 위치 미정</h6>
                {talk.map((talk, index) => (
                    <div>
                        <div>
                            <p>{talk.talkid}</p>
                            <p>{talk.talkcomment}</p>
                            <p>{talk.wdate.substring(0, 16)}</p>
                        </div>
                    </div>
                ))}
            </div>
        )
    }

    function testfnc() {
        // alert("확인용");
        if (localStorage.getItem("login") === null) {
            alert("로그인 후 작성해주세요!");
            navigate("/login");
        }
    }

    function commentSubmit() {
        // alert("확인용");

        // console.log(localStorage.getItem("login"));

        const loginData = JSON.parse(localStorage.getItem("login"));
        const id = loginData.id;

        // alert(id);

        axios.post("http://localhost:3000/talkcomment", null, { params: { "talkid": id, "talkcomment": comment } })
            .then(function (res) {
                // alert(res.data);
                if (res.data === "YES") {
                    const fetchTalkData = async () => {
                        try {
                            const res = await axios.get("http://localhost:3000/alltalkcomment");
                            setTalks(res.data);
                        } catch (err) {
                            alert(err);
                        }
                    };

                    fetchTalkData();
                }

            })
            .catch(function (err) {
                alert(err);
            })
    }


    // enter 누르면 입력되게 되는 함수 
    const activeEnter = (e) => {
        if (e.key === "Enter") {
            commentSubmit();
        }
    }


    const loadMoreTalks = async () => {
        const lastTalk = talks[talks.length - 1];

        // const totalPage = Math.floor(alltalk.length / 10) + (alltalk.length % 10 > 0 ? 1 : 0);


        // console.log("길이확인" + totalPage);



        axios.get('http://localhost:3000/alltalkcomment', {})
            .then((res) => {
                // const newTalks = res.data.slice((indexCom*10)+1, (indexCom)*20);
                // setTalks([...talks.slice(0, 10), ...newTalks]);

                const startIndex = indexCom * 10;
                const endIndex = alltalk.length - talks.length > 10 ? (indexCom + 1) * 10 : alltalk.length;
                const newTalks = res.data.slice(startIndex, endIndex);

                const totalPage = Math.ceil(alltalk.length / 10);
                // const newTalks = res.data.slice(indexCom * 10, (indexCom + 1) * 10);
                setTalks([...talks, ...newTalks]);

                setIndecCom(indexCom + 1);
                // setTalks((prevTalks) => [...prevTalks, ...res.data.slice(0, 10)]);
                // setTalks([...talks, ...res.data]);
            })
            .catch((err) => {
                console.error(err);
            });

        // const res = await axios.get("http://localhost:3000/alltalkcomment", {
        //     params: { skip, limit },
        // });
        // console.log(res.data);
        // setTalks((prevTalks) => prevTalks.concat(res.data));
        // setSkip((prevSkip) => prevSkip + limit);
    };

    return (
        <div>
            <h2>여기는 무비차티읍니다.</h2>
            <h3>cgv 상영작 15위 까지</h3>
            {/* {loading ? (<p>LOADING...</p>) : (<MovieList movies={movielist} images={imageslist} />)} */}
            <MovieList movies={movielist} images={imageslist} />
            {/* <Talklist talk={talks} /> */}

            <h3>테스트</h3>
            <input onClick={testfnc} value={comment} onChange={(e) => { setComment(e.target.value) }}
                onKeyDown={activeEnter} />
            <button type="submit" onClick={commentSubmit}>Submit</button>

            <div>
                {talks.map((talk, index) => (
                    <div key={index}>{index + 1}{talk.talkid}{talk.talkcomment}</div>
                ))}
                <button onClick={loadMoreTalks}>더보기</button>
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
        </div>
    );
}
export default MovieCrawling;
