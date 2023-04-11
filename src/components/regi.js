import React, { useState } from "react";
import { useNavigate } from "react-router-dom"
import axios from "axios";

function Regi(){
    let history = useNavigate();

    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [nickname, setNickname] = useState('');
    const [email, setEmail] = useState('');
    const [phonenum, setPhonenum] = useState('');
    const [address, setAddress] = useState('');

    const idCheck = async() => {
        await axios.post('http://localhost:3000/idcheck', null, { params:{"id":id} })
                .then(function(res){
                    if(res.data === 'YES'){
                        alert('사용가능한 아이디입니다.');
                    }else{
                        alert('사용중인 아이디입니다.');
                        setId('');
                    }
                })
                .catch(function(err){
                    alert(err);
                })
    }

    function account(){
        let member = { "id":id, "password":password, "nickname":nickname, "email":email, "phoneNum":phonenum, "address":address };
        axios.post('http://localhost:3000/addmember', null, { params:member })
            .then(function(resp){
                if(resp.data === "YES"){
                    alert("정상적으로 가입되었습니다.");
                    history("/");  // 이동(link)
                }else{
                    alert("가입되지 않았습니다.");
                }
            })
            .catch(function(err){
                alert('err');
            })
    }

    return (
        <div>
            <h3>회원가입</h3>

            <input value={id} onChange={(e)=>setId(e.target.value)} placeholder="아이디" />&nbsp;
            <button onClick={idCheck}>id확인</button><br/><br/>

            <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="비밀번호" /><br/><br/>
            <input value={nickname} onChange={(e)=>setNickname(e.target.value)} placeholder="닉네임" /><br/><br/>
            <input value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="이메일" /><br/><br/>
            <input value={phonenum} onChange={(e)=>setPhonenum(e.target.value)} placeholder="휴대전화" /><br/><br/>
            <input value={address} onChange={(e)=>setAddress(e.target.value)} placeholder="주소" /><br/><br/>
            <button onClick={account}>회원가입</button>
        </div>
    )
}

export default Regi;