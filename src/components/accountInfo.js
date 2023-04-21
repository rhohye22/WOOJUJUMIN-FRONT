import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import "./accountInfo.css";

function AccountInfo() {
  let history = useNavigate();

  const [memberSeq, setmemberSeq] = useState("");
  const [id, setId] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPwd] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNum, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [profile, setProfile] = useState("");

  const imgRef = useRef();

  function imageLoad() {
    const file = imgRef.current.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setProfile(reader.result);
      console.log(profile);
    };
  }

  // login 되어 있는지 검사
  useEffect(() => {
    let login = JSON.parse(localStorage.getItem("login"));
    if (login !== undefined) {
      // 빈칸이 아닐때
      setmemberSeq(login.memberSeq);
      setId(login.id);
      setNickname(login.nickname);
      setPwd(login.password);
      setEmail(login.email);
      setPhone(login.phoneNum);
      setAddress(login.address);
      setProfile(login.profile);
      //alert(login);
    } else {
      // alert('로그인해 주십시오');
      history("/login");
    }
  }, [history]);

  const idChange = (e) => setId(e.target.value);
  const nicknameChange = (e) => setNickname(e.target.value);
  const passwordChange = (e) => setPwd(e.target.value);
  const emailChange = (e) => setEmail(e.target.value);
  const phoneChange = (e) => setPhone(e.target.value);
  const addressChange = (e) => setAddress(e.target.value);
  //const profileChange = (e) => setProfile(e.target.value);
  const passwordConfirmChange = (e) => setconfirmPassword(e.target.value);

  function changeInfo(e) {
    //alert(profile);
    e.preventDefault();
    let formData = new FormData();
    formData.append("memberSeq", memberSeq);
    formData.append("id", id);
    formData.append("password", password);
    formData.append("nickname", nickname);
    formData.append("email", email);
    formData.append("phoneNum", phoneNum);
    formData.append("address", address);
    formData.append("uploadFile", document.frm.uploadFile.files[0]);

    if (password !== confirmPassword) {
      return alert("비밀번호와 비밀번호 확인은 같아야 합니다.");
    }

    axios
      .post("http://localhost:3000/changeInfo", formData)
      .then((res) => {
        console.log(res.data);
        if (res.data === "YES") {
          alert("성공적으로 수정되었습니다");
          history("/login");
        } else {
          alert("수정되지 않았습니다");
        }
      })
      .catch(function (err) {
        alert(err);
      });
  }

  return (
    <>
      <Link to="/accountInfo">회원정보 수정</Link>&nbsp;&nbsp;&nbsp;
      <Link to="/mybbsList">내가 쓴 글</Link>&nbsp;&nbsp;&nbsp;
      <Link to="/partyAccept">파티원 승인</Link>&nbsp;&nbsp;&nbsp;
      <Link to="/partyRoom">파티방</Link>
      <div className="form">
        <div className="form-el">
          <label htmlFor="id">Id</label> <br />
          <input id="id" name="id" value={id} onChange={idChange} />
          <p className="message"> </p>
        </div>

        <div className="form-el">
          <label htmlFor="name">Nick Name</label> <br />
          <input
            id="name"
            name="name"
            value={nickname}
            onChange={nicknameChange}
          />
          <p className="message"></p>
        </div>
        <div className="form-el">
          <label htmlFor="password">Password</label> <br />
          <input
            id="password"
            name="password"
            value={password}
            onChange={passwordChange}
          />
          <p className="message"></p>
        </div>
        <div className="form-el">
          <label htmlFor="passwordConfirm">Password Confirm</label> <br />
          <input
            id="passwordConfirm"
            name="passwordConfirm"
            onChange={passwordConfirmChange}
          />
          <p className="message"></p>
        </div>
        <div className="form-el">
          <label htmlFor="email">Email</label> <br />
          <input id="email" name="name" value={email} onChange={emailChange} />
          <p className="message"></p>
        </div>
        <div className="form-el">
          <label htmlFor="phone">Phone</label> <br />
          <input
            id="phone"
            name="phone"
            value={phoneNum}
            onChange={phoneChange}
          />
          <p className="message"></p>
        </div>
        <div className="form-el">
          <label htmlFor="address">Address</label> <br />
          <input
            id="address"
            name="address"
            value={address}
            onChange={addressChange}
          />
          <p className="message"></p>
        </div>
        <form name="frm" onSubmit={changeInfo} encType="multipart/form-data">
          <div className="form-el">
            <label className="signup-profileImg-label" htmlFor="profileImg">
              프로필 이미지 추가
            </label>{" "}
            <br />
            <input
              className="signup-profileImg-input"
              id="profileImg"
              name="uploadFile"
              type="file"
              onChange={imageLoad}
              ref={imgRef}
            />
            <div
              className="preview"
              style={{ display: "block", margin: "0 auto" }}
            >
              {profile && (
                <img src={profile} style={{ width: "50px", height: "50px" }} />
              )}
            </div>
            <p className="message"></p>
          </div>

          <Button
            type="submit"
            className="accountInfoButton"
            onClick={changeInfo}
          >
            수정하기
          </Button>
        </form>
      </div>
    </>
  );
}

export default AccountInfo;
