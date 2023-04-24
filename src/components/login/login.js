import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";
import KakaoLogin from "react-kakao-login";
// npm install react-kakao-login
import { useNavigate } from "react-router-dom";
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
// npm install @react-oauth/google@latest
import jwt_decode from 'jwt-decode';
// npm install jwt-decode
import "./login.css";

function Login() {
  const [id, setId] = useState("");

  const [password, setPwd] = useState("");

  const [cookies, setCookies] = useCookies("");
  // checkbox
  const [saveId, setSaveId] = useState(false);

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

  function login() {
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
    <div>
      <h3>Login</h3>
      <input
        value={id}
        onChange={(e) => setId(e.target.value)}
        placeholder="아이디"
      />
      <br />
      <input
        type="password"
        value={password}
        onChange={(e) => setPwd(e.target.value)}
        placeholder="패스워드"
      />
      <br />
      <input type="checkbox" checked={saveId} onChange={CheckHandler} />
      아이디저장
      <br />
      <br />
      <button onClick={() => login()}>Login</button>&nbsp;
      <a href="/regi">회원가입</a>
      <hr/>

      <KakaoLogin
          token={kakaoClientId}
          onSuccess={kakaoOnSuccess}
          onFail={kakaoOnFailure}
      /><br/><br/>
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
    </div>
  );
}

export default Login;
