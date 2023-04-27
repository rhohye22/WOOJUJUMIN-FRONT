import axios from "axios";
import React, { useEffect, useRef, useState } from "react";

function TestScroll() {

    const [alltalk, setAlltalk] = useState([]);
    const [talks, setTalks] = useState([]);
    // const [skip, setSkip] = useState(0);
    // const [limit, setLimit] = useState(10);
    const [indexCom, setIndecCom] = useState(0);

    useEffect(() => {

        const talkData = async () => {
            await axios.get("http://localhost:3000/alltalkcomment", { params: {} })
                .then(function (res) {
                    console.log(res.data);
                    setAlltalk(res.data);
                    // console.log(res.data.slice(0,10));
                    setTalks(res.data.slice(indexCom, (indexCom + 1) * 10));
                    setIndecCom(indexCom + 1);
                })
                .catch(function (err) {
                    alert(err);
                })
        }

        talkData();
    }, [])

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
        <>
            <div>
                {talks.map((talk, index) => (
                    <div key={index}>{index + 1}{talk.talkid}{talk.talkcomment}</div>
                ))}
                <button onClick={loadMoreTalks}>더보기</button>
            </div>
        </>
    );

}


export default TestScroll;






