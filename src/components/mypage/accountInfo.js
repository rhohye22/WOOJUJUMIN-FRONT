import * as React from 'react';
import {useEffect, useState, useRef} from "react";
import axios from 'axios';
import { Link, useParams, Routes, Route, useNavigate } from "react-router-dom";

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useDaumPostcodePopup } from "react-daum-postcode";

import "./page.css";
import "./accountInfo.css";




//npm install @mui/material @emotion/react @emotion/styled --legacy-peer-deps
//npm install @mui/icons-material --legacy-peer-deps
function Mypage(){

    let history = useNavigate();


    const [memberSeq, setmemberSeq] = useState('');
    const [id, setId] = useState('');
    const [nickname, setNickname] = useState('');
    const [password, setPwd] = useState('');
    const [confirmPassword, setconfirmPassword] = useState("");
    const [email, setEmail] = useState('');
    const [phoneNum, setPhone] = useState('');
   
    
    const [profile, setProfile] = useState('');
    let address = "";
    const [juso, setJuso] = useState("");
    const imgRef = useRef();
    
    const [flg, setFlg] = useState(false);
    const style = {
        width: '100%',
        maxWidth: 360,
        bgcolor: 'background.paper',
      };
  
    function imageLoad() {
      setFlg(true);
      const file = imgRef.current.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
          setProfile(reader.result);
          console.log(profile);
          console.log(flg);
      }
  }
  
   // 다음 주소 api
  
   const open = useDaumPostcodePopup("//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js");
  
   const handleComplete = (data) => {
     let fullAddress = data.address;
     let extraAddress = "";
  
     if (data.addressType === "R") {
       if (data.bname !== "") {
         extraAddress += data.bname;
       }
       if (data.buildingName !== "") {
         extraAddress += extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
       }
       fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
     }
  
     address = data.sido + " " + data.sigungu + " " + data.bname + " " + data.roadAddress;
     setJuso(data.roadAddress);
  
     console.log(address);
     console.log(data); // e.g. '서울 성동구 왕십리로2길 20 (성수동1가)'
     //setVisible(true);
   };
  
   const handleClick = () => {
     open({ onComplete: handleComplete });
   };
  
     // login 되어 있는지 검사
        useEffect(() => {
        let login = JSON.parse(localStorage.getItem("login"));
        if(login !== undefined){ // 빈칸이 아닐때
            setmemberSeq(login.memberSeq);
            setId(login.id);
            setNickname(login.nickname);
            setPwd(login.password);
            setEmail(login.email);
            setPhone(login.phoneNum);
            setJuso(login.address);
            setProfile(login.profile);
            //alert(login);
        }else{
           // alert('로그인해 주십시오');
            history('/login');
        }
  
    }, [history]);
  
    const idChange = (e) => setId(e.target.value);
    const nicknameChange = (e) => setNickname(e.target.value);
    const passwordChange = (e) => setPwd(e.target.value);
    const emailChange = (e) => setEmail(e.target.value);
    const phoneChange = (e) => setPhone(e.target.value);
    //const addressChange = (e) => setAddress(e.target.value);
    //const profileChange = (e) => setProfile(e.target.value);
    const passwordConfirmChange = (e) => setconfirmPassword(e.target.value);
  
  
    function changeInfo(e){
      //alert(profile);
      e.preventDefault();
      let formData = new FormData();
      formData.append("memberSeq", memberSeq);
      formData.append("id", id);
      formData.append("password", password);
      formData.append("nickname", nickname);
      formData.append("email", email);
      formData.append("phoneNum", phoneNum);
      formData.append("address", juso);
      formData.append("uploadFile", document.frm.uploadFile.files[0]);
  
  
      if(password !== confirmPassword){
        return alert('비밀번호와 비밀번호 확인은 같아야 합니다.')
    }
  
      axios.post("http://localhost:3000/changeInfo", formData)
               .then(res => {
                  console.log(res.data);
                  if(res.data === "YES"){
                      alert("성공적으로 수정되었습니다");

                      history('/');    
                  }else{
                      alert("수정되지 않았습니다");
                  }
               })
               .catch(function(err){
                  alert(err);
               })   
    }
    const gomy = () => {

    history('/mybbsList');

  };
    const goinfo = () => {

    history('/mypage');

  };
    const goparty = () => {

    history('/partyAccept');

  };
    const gomyparty = () => {

    history('/partyList');

  };

   useEffect(() => {
             
}, [history]);
  
  
      return(
          <>

            <List sx={style} component="nav" aria-label="mailbox folders">
      <ListItem button>
        <ListItemText primary="회원정보 수정" onClick={()=>goinfo()}></ListItemText>
      </ListItem>
      <Divider />
      <ListItem button>
        <ListItemText primary="내가 쓴 글" onClick={()=>gomy()}></ListItemText>
      </ListItem>
      <ListItem button>
        <ListItemText primary="파티원 승인" onClick={()=>goparty()}></ListItemText>
      </ListItem>
      <Divider light />
      <ListItem button>
        <ListItemText primary="내파티 보기" onClick={()=>gomyparty()}></ListItemText>
      </ListItem>
    </List>






      <Form className='gamssagi'>
      <Form.Group className="mb-3">
       <Form.Label>ID</Form.Label>
       <Form.Control type="id" id="id" name="id" defaultValue={id} onChange={idChange}  />
       <Form.Text className="text-muted">
            We'll never share your id with anyone else.
          </Form.Text>
       </Form.Group>
  
      <Form.Group className="mb-3">
       <Form.Label>Nick Name</Form.Label>
       <Form.Control type="name" id="name" name="name" defaultValue={nickname} onChange={nicknameChange}  />
     
       </Form.Group>
  
      <Form.Group className="mb-3" >
       <Form.Label>Password</Form.Label>
       <Form.Control type="password" id="password" name="password" defaultValue={password} onChange={passwordChange}  />
     
       </Form.Group>
  
      <Form.Group className="mb-3" >
       <Form.Label>Password Confirm</Form.Label>
       <Form.Control type="passwordConfirm" id="passwordConfirm" name="passwordConfirm"  onChange={passwordConfirmChange}  />
     
       </Form.Group>
  
       <Form.Group className="mb-3" >
       <Form.Label>Email</Form.Label>
       <Form.Control type="email" id="email" name="email" defaultValue={email} onChange={emailChange}  />
       <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
       </Form.Group>
   
       <Form.Group className="mb-3">
       <Form.Label>Phone</Form.Label>
       <Form.Control type="phone" id="phone" name="phone" defaultValue={phoneNum}  onChange={phoneChange}  />
     
       </Form.Group>
  
       <Form.Group className="mb-3">
       <Form.Label>Address</Form.Label>
       <Form.Control type="address" id="address" name="address" defaultValue={juso}   /> <br></br>
       <Button variant="info"  onClick={handleClick} >행성등록</Button>
     
       </Form.Group>
       </Form>
     
    
       <form name="frm" onSubmit={changeInfo} encType="multipart/form-data">
      <div className="form-el">
         <label className="signup-profileImg-label" htmlFor="profileImg">프로필 이미지 추가</label> <br />
         <input
            className="signup-profileImg-input"         
            id="profileImg"
           name="uploadFile"
           type="file"
           
           onChange={imageLoad} ref={imgRef}
         />
            {flg ?
  
                <div className="preview" style={{ display:"block", margin:'0 auto'}}>
               <img src={profile} alt=""  style={{width:'50px', height:'50px', borderRadius: "50%"}} />
                </div>:
  
                <div className="preview" style={{ display:"block", margin:'0 auto'}}>
                {profile && <img src={`http://localhost:3000/upload/member/${profile}`} style={{width:'50px', height:'50px', borderRadius: "50%"}} />}
                </div>
            }
         <p className="message"></p>
       </div> 
      
       <Button type="submit" className="accountInfoButton"  onClick={changeInfo}>수정하기</Button>
       </form>
     
   
    
   </>
  
     
      )
  
  }
export default Mypage;