import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

import { signInWithEmailAndPassword } from "firebase/auth";
import axios from "axios";
import { auth } from "../../firebase";

import KakaoLogin from "react-kakao-login";
// npm install react-kakao-login
import { useNavigate } from "react-router-dom";
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
// npm install @react-oauth/google@latest
import jwt_decode from 'jwt-decode';
// npm install jwt-decode
import "./login.css";
import { Button, Container, FloatingLabel, Form, Row, Col } from 'react-bootstrap';

function Login() {
  const [id, setId] = useState("");

  const [password, setPwd] = useState("");

  const [cookies, setCookies] = useCookies("");
  // checkbox
  const [saveId, setSaveId] = useState(false);

  const [err, setErr] = useState(false);

  const navigate = useNavigate();

  function CheckHandler() {
    // alert(saveId)
    setSaveId(!saveId);
    if (!saveId === true && id !== "") {
      setCookies("user_id", id);
    } else {
      setCookies("user_id", "");
    }
  }

  const Login = async (e) => {
    const hab = '@naver.com';
    const chatId = id + hab;
    const chatPwd = password;
      try{
        await signInWithEmailAndPassword(auth, chatId, chatPwd);
        //alert('hello');
        // history("/");
      }catch(err){
        setErr(true);
      }

    axios.post("http://localhost:3000/login", null, { params: { id: id, password: password }})
        .then(function (resp) {
        console.log(resp.data);
        if (resp.data !== null && resp.data !== "") {
          alert(resp.data.nickname + "님 환영합니다");

          localStorage.setItem("login", JSON.stringify(resp.data));


          document.location.href = '/';

        } else {
          alert("id나 password를 확인하십시오");
        }
      })
      .catch(function (err) {
        alert(err);
      });
  }

  useEffect(
    function () {
      let user_id = cookies.user_id;
      if (user_id !== undefined && user_id !== "") {
        setId(user_id);
        setSaveId(true);
      } else {
        setId("");
        setSaveId(false);
      }
    },
    [cookies]
  );

  // 카카오 로그인
  const kakaoClientId = 'bae3cae9292dc7ae67aa897703235e5e'
  const kakaoOnSuccess = async (data)=>{
      console.log(data);
      // alert(data);
      const idToken = data.response.id_token;  // 인가코드 백엔드로 전달
      
      const kakaoId = 'kakao_'+data.profile.id;
      const kakaoImg = data.profile.properties.profile_image;
      const kakaoNickname = data.profile.properties.nickname;
      const kakaoEmail = data.profile.kakao_account.email;
      // alert(kakaoId);
      // alert(kakaoNickname);

      console.log(idToken);
      // alert(idToken);

      // 해당 카카오 계정이 있는지 확인
      axios.post('http://localhost:3000/idcheck', null, { params:{"id":kakaoId} })
              .then(function(res){
                if(res.data === 'YES'){
                    // 임의 비밀번호
                    const randomString = Math.random().toString(36).slice(2);
                
                    // 데이터를 모아서 백엔드로 넘기기
                    let kakaoParams = { 'id':kakaoId, 'password':randomString, 'profile':kakaoImg, 'nickname':kakaoNickname, 'email':kakaoEmail, 'phoneNum':'초기값', 'address':'초기값' };
                    axios.post("http://localhost:3000/socialRegi", null, { params:kakaoParams })
                      .then(function (resp) {
                      if (resp.data === "YES") {
                        console.log(kakaoParams);
                        navigate('/socialLogin', {
                          state: {
                            id: `${kakaoId}`,
                            nickname:`${kakaoNickname}`
                          }
                        });
                        // document.location.href = `/kakaoLogin`;

                      } else {
                        alert("가입되지 않았습니다.");
                      }
                    })
                    .catch(function (err) {
                      alert(err);
                    });
                }else{
                  axios.post("http://localhost:3000/socialLogin", null, { params:{ 'id':kakaoId } })
                      .then(function (resp) {
                      console.log(resp.data);
                      if (resp.data !== null && resp.data !== "") {
                        alert(resp.data.nickname + "님 환영합니다");
                        localStorage.setItem("login", JSON.stringify(resp.data));
            
                        document.location.href = '/';
                      } else {
                        alert("로그인에 실패했습니다.");
                      }
                    })
                    .catch(function (err) {
                      alert(err);
                    });
                  }
              })
              .catch(function(err){
                  alert(err);
                  alert('아이디 찾기');
              })
  }
  const kakaoOnFailure = (error) => {
      console.log(error);
  };

  // 구글 로그인
  const clientId = '35821294018-ps4nug5312m228unr95fih9gc2hq518u.apps.googleusercontent.com'
  const googleOnSuccess = async(credentialResponse) => {
    console.log(credentialResponse.credential);
    const decodeding = jwt_decode(credentialResponse.credential);
    console.log(decodeding);
    
    const googleId = 'google_'+decodeding.sub;
    const googleNickname = decodeding.name;
    const googleEmail = decodeding.email;
    const googleImg = decodeding.picture;

    // 구글 계정이 있는지 확인
    axios.post('http://localhost:3000/idcheck', null, { params:{"id":googleId} })
          .then(function(res){
              if(res.data === 'YES'){
                  // 임의 비밀번호
                  const randomString = Math.random().toString(36).slice(2);
              
                  // 데이터를 모아서 백엔드로 넘기기
                  let googleParams = { 'id':googleId, 'password':randomString, 'profile':googleImg, 'nickname':googleNickname, 'email':googleEmail, 'phoneNum':'초기값', 'address':'초기값' };
                  axios.post("http://localhost:3000/socialRegi", null, { params:googleParams })
                    .then(function (resp) {
                    if (resp.data === "YES") {
                      console.log(googleParams);
                      navigate('/socialLogin', {
                        state: {
                          id: `${googleId}`,
                          nickname:`${googleNickname}`
                        }
                      });

                    } else {
                      alert("가입되지 않았습니다.");
                    }
                  })
                  .catch(function (err) {
                    alert(err);
                  });
              }else{
                axios.post("http://localhost:3000/socialLogin", null, { params:{ 'id':googleId } })
                    .then(function (resp) {
                    console.log(resp.data);
                    if (resp.data !== null && resp.data !== "") {
                      alert(resp.data.nickname + "님 환영합니다");
                      localStorage.setItem("login", JSON.stringify(resp.data));
          
                      document.location.href = '/';
                    } else {
                      alert("로그인에 실패했습니다.");
                    }
                  })
                  .catch(function (err) {
                    alert(err);
                  });
              }
          })
          .catch(function(err){
              alert(err);
              alert('아이디 찾기');
          })
  }

  return (
    <Container fluid>
    <Form>
      <h3>우주주민 로그인</h3>
      <br/>
      <Row>
      <Col></Col>
        <Col></Col>
        <Col>
      <FloatingLabel
        controlId="floatingInput"
        label="아이디"
        className="mb-3"
      >
        <Form.Control type="id" placeholder="아이디" value={id} onChange={(e) => setId(e.target.value)} />
      </FloatingLabel>
      </Col>
      <Col style={{ marginTop: '15px', textAlign: 'left'}}><a href="/idsearch">forget?</a></Col>
      <Col></Col>
      </Row>

      <Row>
      <Col></Col>
      <Col></Col>
      <Col>
      <FloatingLabel controlId="floatingPassword" label="비밀번호">
        <Form.Control type="password" placeholder="비밀번호" value={password} onChange={(e) => setPwd(e.target.value)} />
      </FloatingLabel>
      </Col>
      <Col style={{ marginTop: '15px', textAlign: 'left'}}><a href="/pwdsearch">forget?</a></Col>
      <Col></Col>
      </Row>
      
      <Row>
      <Col></Col>
      <Col md={2}></Col>
      <Col md={2}>
      <Form.Group className="mb-3" controlId="formBasicCheckbox" style={{textAlign:'left', marginLeft:'25px'}}>
        <Form.Check type="checkbox" label="아이디 저장" checked={saveId} onChange={CheckHandler} />
      </Form.Group>
      </Col>
      <Col style={{textAlign:'left', marginLeft:'0px'}}><a href="/regi">회원가입</a></Col>
      <Col></Col>
      </Row>

      <Button variant="primary" onClick={() => Login()}>
        로그인
      </Button>
      {/* <input
        value={id}
        onChange={(e) => setId(e.target.value)}
        placeholder="아이디"
      />&nbsp;&nbsp;<a href="/idsearch">forget?</a>
      <br />
      <input
        type="password"
        value={password}
        onChange={(e) => setPwd(e.target.value)}
        placeholder="패스워드"
      />&nbsp;&nbsp;<a href="/pwdsearch">forget?</a>
      <br />
      <input type="checkbox" checked={saveId} onChange={CheckHandler} />
      아이디저장
      <br />
      <br />
      <button onClick={() => Login()}>Login</button>&nbsp;
      <a href="/regi">회원가입</a> */}
      <hr/>

      <Row>
        <Col md={4}></Col>
        <Col>
      <KakaoLogin
          token={kakaoClientId}
          onSuccess={kakaoOnSuccess}
          onFail={kakaoOnFailure}
      />
      </Col>
      <Col>
      <div className="google-box">
      <GoogleOAuthProvider clientId={clientId}>
        <GoogleLogin
            onSuccess={googleOnSuccess}
            onFailure={() => {
              console.log('로그인 실패');
            }}
        />
      </GoogleOAuthProvider>
      </div>
      </Col>
      <Col md={4}></Col>
      </Row>
    </Form>
    </Container>
  );
}

export default Login;
