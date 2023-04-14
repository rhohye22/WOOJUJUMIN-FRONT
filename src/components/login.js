import React, { useEffect, useState } from "react";

import { useCookies } from "react-cookie";

import axios from "axios";

function Login() {
  const [id, setId] = useState("");

  const [password, setPwd] = useState("");


  const [cookies, setCookies] = useCookies("");
  // checkbox
  const [saveId, setSaveId] = useState(false);

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
    axios


      .post("http://localhost:3000/login", null, { params: { id: id, password: password }})

     


      .then(function (resp) {
       console.log(resp.data);
        if (resp.data !== null && resp.data !== "") {
          alert(resp.data.nickname + "님 환영합니다");


          localStorage.setItem("login", JSON.stringify(resp.data));

          history("/free");

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
    </div>
  );
}

export default Login;
