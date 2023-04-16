import React, { useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom"
import axios from "axios";
import { useDaumPostcodePopup } from 'react-daum-postcode';

function Regi(){
    let history = useNavigate();

    // 각각의 이름 설정
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [pwdchk, setPwdchk] = useState('');
    const [nickname, setNickname] = useState('');
    const [email, setEmail] = useState('');
    const [phonenum, setPhonenum] = useState('');
    const [profile, setProfile] = useState('');

    let address = '';
    const [juso, setJuso] = useState('');

    const imgRef = useRef();

    // 오류메시지 상태저장
    const [emailMsg, setEmailMsg] = useState('');
    const [pwdMsg, setPwdMsg] = useState('');
    const [pwdchkMsg, setPwdchkMsg] = useState('');
    const [phoneMsg, setPhoneMsg] = useState('');

    // 유효성 검사
    const [isEmail, setIsEmail] = useState(false);
    const [isPwd, setIsPwd] = useState(false);
    const [isPwdchk, setIsPwdchk] = useState(false);
    const [isPhone, setIsPhone] = useState(false);
    // const router = useRouter();

    function imageLoad() {
        const file = imgRef.current.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setProfile(reader.result);
        }
        console.log(profile);
    }

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
                    alert('아이디 찾기');
                })
    }

    const nickCheck = async() => {
        await axios.post('http://localhost:3000/nickcheck', null, { params:{"nickname":nickname} })
                .then(function(res){
                    if(res.data === 'YES'){
                        alert('사용가능한 닉네임입니다.');
                    }else{
                        alert('사용중인 닉네임입니다.');
                        setNickname('');
                    }
                })
                .catch(function(err){
                    alert(err);
                    alert('닉네임 찾기');
                })
    }

    function account(e) {
        e.preventDefault();
        let formData = new FormData();
        formData.append("id", id);
        formData.append("password", pwdchk);
        formData.append("nickname", nickname);
        formData.append("email", email);
        formData.append("phoneNum", phonenum);
        formData.append("address", juso);
        if(document.frm.uploadFile.files[0].name === null || document.frm.uploadFile.files[0].name === '') {
            formData.append("uploadFile", "basic");
        }else {
            console.log(document.frm.uploadFile.files[0].name);
            formData.append("uploadFile", document.frm.uploadFile.files[0]);
        }

        // let member = { "id":id, "password":password, "nickname":nickname, "email":email, "phoneNum":phonenum, "address":address, "uploadFile":formData };
        axios.post('http://localhost:3000/addmember', formData)
            .then(function(resp){
                if(resp.data === "YES"){
                    alert("정상적으로 가입되었습니다.");
                    history("/");  // 이동(link)
                }else{
                    alert("가입되지 않았습니다.");
                }
            })
            .catch(function(err){
                alert(err);
                alert('회원가입 에러');
            })
    }

    // 전화번호
    const onChangePhoneNum = useCallback((e) => {
        const phonenumRegex = /^01(?:0|1|[6-9])-(?:\d{3}|\d{4})-\d{4}$/
        const phonenumCurrent = e.target.value
        setPhonenum(phonenumCurrent)

        if(!phonenumRegex.test(phonenumCurrent)) {
            setPhoneMsg("전화번호가 틀렸어요! 혹시 '-'를 입력하지 않았다면 '-'를 같이 입력해주세요")
            setIsPhone(false)
        }else {
            setPhoneMsg('올바른 전화번호 형식입니다!')
            setIsPhone(true)
        }
    }, [])

    // 이메일
    const onChangeEmail = useCallback((e) => {
        const emailRegex =
        /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/
        const emailCurrent = e.target.value
        setEmail(emailCurrent)

        if (!emailRegex.test(emailCurrent)) {
            setEmailMsg('이메일 형식이 틀렸어요! 다시 확인해주세요!')
            setIsEmail(false)
        } else {
            setEmailMsg('올바른 이메일 형식입니다!')
            setIsEmail(true)
        }
    }, [])

    // 비밀번호
    const onChangePassword = useCallback((e) => {
        const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/
        const passwordCurrent = e.target.value
        setPassword(passwordCurrent)

        if (!passwordRegex.test(passwordCurrent)) {
            setPwdMsg('숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요!')
            setIsPwd(false)
        } else {
            setPwdMsg('안전한 비밀번호입니다!')
            setIsPwd(true)
        }
    }, [])

    // 비밀번호 확인
    const onChangePasswordConfirm = useCallback((e) => {
        const passwordConfirmCurrent = e.target.value
        setPwdchk(passwordConfirmCurrent)

        if (password === passwordConfirmCurrent) {
            setPwdchkMsg('비밀번호를 똑같이 입력했어요 : )')
            setIsPwdchk(true)
        } else {
            setPwdchkMsg('비밀번호가 틀려요. 다시 확인해주세요 ㅜ ㅜ')
            setIsPwdchk(false)
        }
        },
        [password]
    )

    return (
        <div>
            <h3>회원가입</h3>
            {/* 아이디 */}
            <input value={id} onChange={(e)=>setId(e.target.value)} placeholder="아이디" />&nbsp;
            <button onClick={idCheck}>id확인</button><br/><br/>

            {/* 비밀번호 */}
            {/* <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="비밀번호" /><br/><br/> */}
            <input type="password" value={password} onChange={onChangePassword} placeholder="비밀번호" /><br/>
            {password.length > 0 && (
            <span className={`message ${isPwd ? 'success' : 'error'}`}>{pwdMsg}</span>
          )}<br/>

            {/* 비밀번호 확인 */}
            <input type="password" value={pwdchk} onChange={onChangePasswordConfirm} placeholder="비밀번호 확인" /><br/>
            {pwdchk.length > 0 && (
            <span className={`message ${isPwdchk ? 'success' : 'error'}`}>{pwdchkMsg}</span>
          )}<br/>

            {/* 닉네임 */}
            <input value={nickname} onChange={(e)=>setNickname(e.target.value)} placeholder="닉네임" />&nbsp;
            <button onClick={nickCheck}>닉네임 확인</button><br/><br/>

            {/* 이메일 */}
            {/* <input value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="이메일" /><br/><br/> */}
            <input value={email} onChange={onChangeEmail} placeholder="이메일" /><br/>
            {email.length > 0 && <span className={`message ${isEmail ? 'success' : 'error'}`}>{emailMsg}</span>}<br/>

            {/* 전화번호 */}
            {/* <input value={phonenum} onChange={(e)=>setPhonenum(e.target.value)} placeholder="휴대전화" /><br/><br/> */}
            <input value={phonenum} onChange={onChangePhoneNum} placeholder="전화번호" /><br/>
            {phonenum.length > 0 && <span className={`message ${isPhone ? 'success' : 'error'}`}>{phoneMsg}</span>}<br/>
            
            {/* 주소 입력 */}
            <button type='button' onClick={handleClick}>행성 등록</button>&nbsp;
            <input value={juso} readOnly /><br/><br/>

            {/* 프로필 사진 등록 */}
            <form name="frm" onSubmit={account} encType="multipart/form-data">
                <input type="file" onChange={imageLoad} ref={imgRef} name="uploadFile" />&nbsp;
                <img src={profile} alt=""/><br/><br/>
                
                <button type="submit" onClick={account}>회원가입</button>
            </form>
        </div>
    )
}

export default Regi;