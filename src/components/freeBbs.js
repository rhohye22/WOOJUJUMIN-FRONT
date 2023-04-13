import axios from "axios";
import { useState } from "react";

function FreeBbs() {
    const [bbsList, setBbsList] = useState([]);

    return (
        <div style={ {width : "1000px", margin : "0px auto"} }>
            <div style={ {float : "right"} }>
                <select>
                    <option>카테고리</option>
                    <option value={"basketball"}>농구</option>
                    <option value={"soccer"}>축구</option>
                    <option value={"baseball"}>야구</option>
                    <option value={"tvShow"}>예능</option>
                    <option value={"dramaMovie"}>드라마/영화</option>
                    <option value={"game"}>게임</option>
                    <option value={"food"}>음식</option>
                    <option value={"together"}>함께</option>
                    <option value={"travel"}>탐사</option>
                    <option value={"chat"}>잡담</option>
                </select>
            </div>            
            <br />
            <br />
            <div>
                <table border={1} align="center">
                    <col width={"120px"} />
                    <col width={"500px"} />
                    <col width={"100px"} />
                    <col width={"100px"} />
                    <col width={"100px"} />
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>제목</th>
                            <th>작성자</th>
                            <th>작성일</th>
                            <th>조회수</th>
                        </tr>
                    </thead>
                    <tbody>
                        
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default FreeBbs;