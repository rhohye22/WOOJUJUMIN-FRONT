import {useEffect, useState} from "react";
import axios from 'axios';
import {Link, useNavigate} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import "./accountInfo.css";


function AccountInfo(){


    return(

        
        <>
        <Link to="/accountInfo">회원정보 수정</Link>&nbsp;&nbsp;&nbsp;
          <Link to="/mybbsList">내가 쓴 글</Link>&nbsp;&nbsp;&nbsp;
          <Link to="/partyAccept">파티원 승인</Link>&nbsp;&nbsp;&nbsp;
          <Link to="/partyRoom">파티방</Link>
  
   <div className="form">
     <div className="form-el">
       <label htmlFor="id">Id</label> <br />
       <input id="id" name="id"   />
       <p className="message">  </p>
     </div>

     <div className="form-el">
       <label htmlFor="name">Nick Name</label> <br />
       <input id="name" name="name" />
       <p className="message"></p>
     </div>
     <div className="form-el">
       <label htmlFor="password">Password</label> <br />
       <input
         id="password"
         name="password"
     
       
       />
       <p className="message"></p>
     </div>
     <div className="form-el">
       <label htmlFor="passwordConfirm">Password Confirm</label> <br />
       <input
         id="passwordConfirm"
         name="passwordConfirm"
      
         
       />
       <p className="message"></p>
     </div>
     <div className="form-el">
       <label htmlFor="email">Email</label> <br />
       <input
         id="email"
         name="name"
     
         
       />
       <p className="message"></p>
     </div>
     <div className="form-el">
       <label htmlFor="phone">Phone</label> <br />
       <input id="phone" name="phone" />
       <p className="message"></p>
     </div>
     <div className="form-el">
       <label htmlFor="address">Address</label> <br />
       <input
         id="address"
         name="address"
   
         
       />
       <p className="message"></p>
     </div>

     <div className="form-el">
       <label htmlFor="profile">Profile</label> <br />
       <input
         id="profile"
         name="profile"
     
       
       />
       <p className="message"></p>
     </div>
     <Button type="submit" className="accountInfoButton">수정하기</Button>
   </div>
 </>

   
    )

}

export default AccountInfo;