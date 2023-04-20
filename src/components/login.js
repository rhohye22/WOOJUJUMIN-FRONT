import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";
import KakaoLogin from "react-kakao-login";
// npm install react-kakao-login
import { useNavigate } from "react-router-dom";

function Login() {

  let history = useNavigate();

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
                      axios.post("http://localhost:3000/kakaoRegi", null, { params:kakaoParams })
                        .then(function (resp) {
                        if (resp.data === "YES") {
                          console.log(kakaoParams);
                          navigate('/kakaoLogin', {
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
                    axios.post("http://localhost:3000/kakaoLogin", null, { params:{ 'id':kakaoId } })
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
      />
    </div>
  );
}

export default Login;
