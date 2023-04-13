import React, { useState } from "react";
import { useNavigate } from "react-router-dom"
import axios from "axios";
import { useDaumPostcodePopup } from 'react-daum-postcode';

function Regi(){
    let history = useNavigate();

    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [nickname, setNickname] = useState('');
    const [email, setEmail] = useState('');
    const [phonenum, setPhonenum] = useState('');

    let address = '';
    const [juso, setJuso] = useState('');

    //const [visible, setVisible] = useState(false);

    // 다음 주소 api
    const open = useDaumPostcodePopup("//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js");

    const handleComplete = (data) => {
        let fullAddress = data.address;
        let extraAddress = '';
    
        if (data.addressType === 'R') {
          if (data.bname !== '') {
            extraAddress += data.bname;
          }
          if (data.buildingName !== '') {
            extraAddress += extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
          }
          fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
        }
    
        address = data.sido + ' ' + data.sigungu + ' ' + data.bname;
        setJuso(data.sido + ' ' + data.sigungu + ' ' + data.bname);
        
        console.log(address);
        console.log(fullAddress); // e.g. '서울 성동구 왕십리로2길 20 (성수동1가)'
        //setVisible(true);
    };

    const handleClick = () => {
        open({ onComplete: handleComplete });
    };

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
            
            <button type='button' onClick={handleClick}>행성 등록</button>&nbsp;
            <input value={juso} readOnly /><br/><br/>
            
            <button onClick={account}>회원가입</button>
        </div>
    )
}

export default Regi;