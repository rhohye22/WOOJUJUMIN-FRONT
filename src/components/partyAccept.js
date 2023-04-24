import {useEffect, useState} from "react";
import axios from 'axios';
import {Link, useNavigate} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';



function PartyAccept(){


    return(

        
        <>
        <Link to="/accountInfo">회원정보 수정</Link>&nbsp;&nbsp;&nbsp;
          <Link to="/mybbsList">내가 쓴 글</Link>&nbsp;&nbsp;&nbsp;
          <Link to="/partyAccept">파티원 승인</Link>&nbsp;&nbsp;&nbsp;
          <Link to="/partyRoom">파티방</Link>
          <br></br>
          <br></br>
        
          <Link to="/partyAccept">파티 수락</Link>&nbsp;&nbsp;&nbsp;
          <Link to="/partyRequest">파티 요청</Link>&nbsp;&nbsp;&nbsp;
          <h3>ㅇㅇㅇ</h3>
  
 </>

   
    )

}

export default PartyAccept;