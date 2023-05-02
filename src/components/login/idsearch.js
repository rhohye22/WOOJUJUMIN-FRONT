import React, {useState} from "react";
import axios from "axios";

function IdSearch() {
    const [email, setEmail] = useState('');

    const idInfo = async() => {
        await axios
            .get("http://localhost:3000/idsearch", { params: { 'email': email } })
            .then(function(res) {
                //console.log(res);
            if (res.data === null || res.data === "") {
                alert("입력하신 이메일과 일치하는 계정이 없습니다.");
                setEmail("");
            } else {
                alert(res.data.nickname+'님의 아이디는 ' + res.data.id + '입니다.');
                document.location.href = '/login';
            }
            })
            .catch(function(err) {
            alert(err);
            alert("아이디 찾기");
            });
    }

    return(
        <div>
            <h1>아이디 찾기</h1>
            <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="이메일 입력"
            />
            <br/><br/>
            <button onClick={() => idInfo()}>아이디 찾기</button>
        </div>
    );
}

export default IdSearch;