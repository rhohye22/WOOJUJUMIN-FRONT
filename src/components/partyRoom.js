import {useEffect, useState} from "react";
import axios from 'axios';
import {Link, useNavigate} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import MsgModal from "./modals/MsgModal";
import {Modal, Button, Form, Container} from 'react-bootstrap'

import "./modals/MsgModal.css";

function PartyRoom(){

    let history = useNavigate();

    const [id, setId] = useState('');
    const [targetId, setTargetId] = useState('');
    const [memberlist, setMemberlist] = useState([]); // 게시판은 배열로 넘어오니까 

    const [msgModal, setMsgModal] = useState(false); // 기본적으로 모달창이 꺼져있어서 false
 

        // login 되어 있는지 검사
        useEffect(() => {
            let login = JSON.parse(localStorage.getItem("login"));
            if(login !== undefined){ // 빈칸이 아닐때
                setId(login.id);
               
              
                
            }else{
               // alert('로그인해 주십시오');
                history('/login');
            }
    
        }, [history]);

        function getMemberlist(){
       
            
            axios.get("http://localhost:3000/memberlist", { params:{ "id":id } })
            .then(function(resp){
              
                setMemberlist(resp.data); 
              
               
                 
            })
            .catch(function(err){
                alert(err);
            })

            
        }


        useEffect(function(){
            if(id){
    
                getMemberlist();  // 실행할 내용 => 컴포넌트가 처음으로 마운트되었을때 실행. 이경우에만 실행되고 다른 경우는 실행 안되므로 초기에 한번만 실행시
            
            }
                            
        }, [id]);// 한번만 호출

    function chatting(){

        history("../pages/Home");
    }



    return(
        
        <>
        <MsgModal sendId={id} targetId={targetId} show={msgModal} onHide={()=>setMsgModal(false)}/>
       

        <Link to="/accountInfo">회원정보 수정</Link>&nbsp;&nbsp;&nbsp;
          <Link to="/mybbsList">내가 쓴 글</Link>&nbsp;&nbsp;&nbsp;
          <Link to="/partyAccept">파티원 승인</Link>&nbsp;&nbsp;&nbsp;
          <Link to="/partyRoom">파티방</Link>
  <br></br>
  <h3>파티방(메시지, 채팅방)</h3>

  <br></br>
   

  
    <table border="1" style={{ margin:'0 auto'}}>
        <colgroup>
            <col width='200'/><col width='200'/><col width='200'/>
        </colgroup>
        <thead>
            <tr>
              <th>아이디</th><th>닉네임</th><th>메시지</th>
            </tr>
        </thead>

     
        <tbody>
            {
              memberlist && memberlist.map(function(mem, i){
                    return(
                        <tr key={i}>
                         
                          
                            <td align="center"> {mem.id} </td>
                           
                            <td align="center">{mem.nickname}</td>

                         

                            
                            <td align="center">
                            {mem.id !== id &&
                                 <Button className="msgButton" variant="primary" type="button" onClick={()=> {setMsgModal(true); setTargetId(mem.id);}  }>
                                  보내기 </Button>
                                  
                            }
                                  </td>
                             
                        </tr>
                    )
                })
            }
        
        </tbody> 
           
    </table> 


<br></br>

<br></br>
{/* 여기서 아싸리 로컬스토리지에서 받아온 dto를 이용해서 채팅방에 들어가면 넘기고 db생성하게하기 */}
<button onClick={chatting}>채팅방</button>




 </>

   
    )

}

export default PartyRoom;