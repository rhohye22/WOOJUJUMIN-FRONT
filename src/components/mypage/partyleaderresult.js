import { async } from "@firebase/util";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

function PartyLeaderresult() {

    let history = useNavigate();

    const loginInfo = JSON.parse(localStorage.getItem("login"));
    const [idcardDto, setIdcardDto] = useState([]);

    useEffect(() => {
        function loginfnc() {
            // alert("확인용");
            if (localStorage.getItem("login") === null) {
                alert("로그인 해주십시오");
                history("/login");
            }
            // else {
            //     const loginData = JSON.parse(localStorage.getItem("login"));
            //     setMemid(loginData.id);
            // }
        }

        loginfnc();
    }, [])

    useEffect(() => {

        const fetchData = async () => {
            await axios.get("http://118.67.132.98:3000/partyleaderresultAll", { params: { "memid": loginInfo.id } })
                .then(function (res) {
                    console.log(JSON.stringify(res.data));
                    setIdcardDto(res.data);
                })
                .catch(function (err) {
                    alert(err);
                })
        }

        fetchData();
    }, []);

    const retryRequest = async()=>{
        await axios.get("http://118.67.132.98:3000/partyleaderreset", {params:{"memid":loginInfo.id }})
        .then(function(res){
            if(res.data === "YES"){
                alert("파티장 신청을 다시 할 수 있습니다.");
                history("/partyleaderrequest");
                window.location.reload();
            }
        })
        .catch(function(err){
            alert(err);
        })
    }

    return (
        <div style={{ paddingTop: "20px" }}>
            <h3 style={{fontWeight:"bold"}}>파티장 신청 결과</h3>
            <table className="ttable">
                <colgroup>
                    <col width={"450px"} />
                    <col width={"450px"} />
                    <col width={"450px"} />
                </colgroup>
                <thead>
                    <th>사진</th>
                    <th>정보</th>
                    <th>결과</th>
                </thead>
                <tbody>
                    <tr>
                        <td style={{ border: "1px solid #e2e2e2", margin: "0" }}><img src={idcardDto.idimage} alt="민증사진" style={{width:"400px"}}/></td>
                        <td style={{ border: "1px solid #e2e2e2" }}>
                            <ul style={{ textAlign: "left", fontSize: "18px", marginLeft: "30px" }}>
                                <li style={{ padding: "2px 0" }}>{idcardDto.idname}</li>
                                <li style={{ padding: "2px 0" }}>{idcardDto.idbirth}</li>
                                <li style={{ padding: "2px 0" }}>{idcardDto.idaddress}</li>
                                <li style={{ padding: "2px 0" }}>{idcardDto.iddate}</li>
                                <li style={{ padding: "2px 0" }}>{idcardDto.idpublic}</li>
                            </ul>
                        </td>
                        <td style={{ border: "1px solid #e2e2e2" }}>
                            {idcardDto.cardcheck === "0" && (
                                <div>
                                    <p style={{ fontSize: "18px", fontWeight: "bold" }}>아직 파티장 승인 대기중입니다.</p>
                                    <p style={{ fontSize: "18px"}}>
                                        신청 날짜 : {idcardDto.wdate.substring(0,10)}
                                        </p>
                                </div>
                            )}
                            {idcardDto.cardcheck === "1" && (<p style={{ fontSize: "18px", fontWeight: "bold" }}>파티장으로 승인 되었습니다.</p>)}
                            {idcardDto.cardcheck === "2" && (
                            <div>
                                <p style={{ fontSize: "18px", fontWeight: "bold" }}>파티장승인이 거절되었습니다.</p>
                                <div style={{marginBottom:"20px"}}>
                                    <Button variant="primary" onClick={retryRequest}>파티장 다시 요청하기</Button>
                                </div>
                                <Button variant="primary">문의하기</Button>
                            </div>
                            )}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}
export default PartyLeaderresult;