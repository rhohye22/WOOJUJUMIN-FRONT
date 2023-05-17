import React, { useState, useCallback } from "react";
import { useDaumPostcodePopup } from 'react-daum-postcode';
import axios from "axios";
import { useLocation } from "react-router-dom";
import { Form, Button, Container, FloatingLabel, Row, Col } from "react-bootstrap";

function SocialHandler() {
    const location = useLocation();
    const userInfo = { ...location.state };
    //alert(userInfo.id);
    //alert(userInfo.nickname);

    const [nickname, setNickname] = useState(userInfo.nickname);
    const [phonenum, setPhonenum] = useState('');
    let address = '';
    const [juso, setJuso] = useState('');

    const [phoneMsg, setPhoneMsg] = useState('');
    const [isPhone, setIsPhone] = useState(false);

    // 유효성 검사
    const [isNickname, setIsNickname] = useState(false);
    const [isJuso, setIsJuso] = useState(false);

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
        setIsJuso(true);
        
        console.log(address);
        console.log(fullAddress); // e.g. '서울 성동구 왕십리로2길 20 (성수동1가)'
        //setVisible(true);
    };

    const handleClick = () => {
        open({ onComplete: handleComplete });
    };

    const nickCheck = async() => {
        await axios.post('http://118.67.132.98:3000/nickcheck', null, { params:{"nickname":nickname} })
                .then(function(res){
                    if(res.data === 'YES'){
                        alert('사용가능한 닉네임입니다.');
                        setIsNickname(true);
                    }else{
                        alert('사용중인 닉네임입니다.');
                        setNickname(userInfo.nickname);
                    }
                })
                .catch(function(err){
                    alert(err);
                    alert('닉네임 찾기');
                })
    }

    function account(){
        if(isJuso === true && isNickname === true && isPhone === true) {
            let member = { "id":userInfo.id, "nickname":nickname, "phoneNum":phonenum, "address":juso };
            axios.post('http://118.67.132.98:3000/socialAdd', null, { params:member })
                .then(function(resp){
                    if(resp.data !== null && resp.data !== ""){
                        alert(resp.data.nickname + "님 환영합니다");
                        localStorage.setItem("login", JSON.stringify(resp.data));
                        document.location.href = '/';  // 이동(link)
                    }else{
                        alert("가입되지 않았습니다.");
                    }
                })
                .catch(function(err){
                    alert('err');
                })
        }else if(isNickname !== true){
            alert('닉네임 중복체크를 꼭 해주세요');
        }else {
            alert('전화번호, 주소를 다시 확인해주세요');
        }
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
    
    return(
        <Container>
            <br/><br/>
            <h3>추가 설정</h3>
            {/* 닉네임 */}
            <Row className="justify-content-md-center">
                <Col></Col>
                <Col md={3}>
            <FloatingLabel
                controlId="floatingInput"
                label="닉네임"
            >
                <Form.Control type="text" placeholder="닉네임" value={nickname} onChange={(e) => setNickname(e.target.value)} />
            </FloatingLabel>
            </Col>
            <Col>
            {/* <input value={nickname} onChange={(e) => setNickname(e.target.value)} placeholder="닉네임" /> */}
            <Button variant="primary" onClick={nickCheck} style={{height:'50px', width:'120px', marginRight:'85%', marginTop:'0.5%'}}>닉네임 확인</Button>
            </Col>
            </Row>
            {/* <input value={nickname} onChange={(e)=>setNickname(e.target.value)} placeholder="닉네임" />&nbsp;
            <button onClick={nickCheck}>닉네임 확인</button><br/> */}
            <p>원하는 닉네임으로 수정해주세요. 수정하지 않을 시 기존에 설정한 닉네임으로 설정됩니다.</p>

            {/* 전화번호 */}
            <Row className="justify-content-md-center">
                <Col md={3}>
            <FloatingLabel
                controlId="floatingInput"
                label="전화번호"
            >
                <Form.Control type="text" placeholder="전화번호" value={phonenum} onChange={onChangePhoneNum} />
            </FloatingLabel>
            </Col>
            </Row>
            {/* <input value={phonenum} onChange={(e)=>setPhonenum(e.target.value)} placeholder="휴대전화" /><br/><br/> */}
            {/* <input value={phonenum} onChange={onChangePhoneNum} placeholder="전화번호" /><br/> */}
            {phonenum.length > 0 && <span className={`message ${isPhone ? 'success' : 'error'}`}>{phoneMsg}</span>}<br/>
            
            {/* 주소 입력 */}
            <Row>
            <Col>
            <Button variant="primary" onClick={() => handleClick()} style={{marginLeft:'64%'}}>행성등록</Button>
            </Col>
            <Col>
            <Form.Group as={Row} className="mb-3" controlId="formPlaintextAddress">
                <Form.Control plaintext readOnly value={juso} style={{textAlign:'left'}} />
            </Form.Group>
            </Col>
            </Row>
            {/* <button type='button' onClick={handleClick}>행성 등록</button>&nbsp;
            <input value={juso} readOnly /><br/><br/> */}
            <Button variant="primary" onClick={account}>추가설정 완료</Button>
        </Container>
    )
}

export default SocialHandler;