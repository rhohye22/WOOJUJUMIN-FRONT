import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";


function Calendardetail() {

    let history = useNavigate();

    // 뒤에 () 안붙이면 오류 난다ㅠ_ㅠ 
    const { calSeq } = useParams();
    // console.log(calSeq);
    const [calinform, setCalinform] = useState([]);
    // const [calDate, setCalDate] = useState("");
    const [calYear, setCalYear] = useState("");
    const [calMonth, setCalMonth] = useState("");
    const [calDay, setCalDay] = useState("");
    const [calTime, setCalTime] = useState("");
    const [calTimeSec, setCalTimeSec] = useState("");
    // console.log(year+month+day+calDate);
    // useEffect(() => {
    //     const fetchData = async () => {
    //         await axios.post("http://localhost:3000/calendardetail", null, { params: { "calSeq": calSeq } })
    //             .then(function (res) {
    //                 console.log(res.data);
    //                 setCalinform(res.data);
    //             })
    //             .catch(function (err) {
    //                 alert(err);
    //             })
    //     };

    //     fetchData();

    // }, [calSeq]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post("http://localhost:3000/calendardetail", null, { params: { "calSeq": calSeq } });
                if (response.data) { // 데이터가 유효한 경우에만 setCalinform 호출
                    console.log(response.data);
                    setCalinform(response.data);
                    // setCalDate(response.data.rdate.substring(0,8));
                    setCalYear(response.data.rdate.substring(0,4));
                    setCalMonth(response.data.rdate.substring(4,6));
                    setCalDay(response.data.rdate.substring(6,8));
                    setCalTime(response.data.rdate.substring(8,10));
                    setCalTimeSec(response.data.rdate.substring(10,12));
                }
            } catch (error) {
                console.error(error);
                alert(error.message);
            }
        };

        fetchData();

    }, [calSeq]);

    function delBtn(){
        // alert("확인용");

        const result = window.confirm("정말로 삭제하시겠습니까?");
        if(result){
            axios.get("http://localhost:3000/calendardelete", {params:{"calSeq":calSeq}})
            .then(function(res){
                if(res.data==="YES"){
                    history("/calendar");
                }
            })
            .catch(function(err){
                alert(err);
            })
        }
        else {
            
        }
    }

    function Caldetail() {

        return (
            <table border={1}>
                <tbody>
                    <tr>
                        <th>{calinform.tagName}</th><td>{calinform.title}</td>
                    </tr>
                    <tr>
                        <th>일정</th><td>{calYear}-{calMonth}-{calDay} {calTime}:{calTimeSec}</td>
                    </tr>
                    <tr>
                        <th>내용</th><td>{calinform.content}</td>
                    </tr>
                </tbody>
            </table>
        );
    }

    return (
        <div>
            <h2>여기는 일정 상세보기입니다.</h2>
            <Caldetail />
            <button type="button"><Link to={`/calendarupdate/${calSeq}`}>일정 수정하기</Link></button>
            <button type="button" onClick={delBtn}>일정 삭제하기</button>
        </div>
    )
}


export default Calendardetail;