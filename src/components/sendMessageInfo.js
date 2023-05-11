import {useEffect, useState} from "react";
import axios from 'axios';
import {Link, useNavigate} from "react-router-dom";
import MsgDetailSendModal from "./modals/MsgDetailSendModal";
import Pagination from "react-js-pagination";
import MsgSendModal from "./modals/MsgSendModal";
import Tab from '@mui/material/Tab';
function SendMessageInfo(){

    let history = useNavigate();
    const [sendmsglist, setSendmsglist] = useState([]); 
    const [id, setId] = useState('');
    const [delmsg, setdelmsg] = useState('');
    const [seq, setseq] = useState('');
    const [title, setTitle] = useState('');
    const [message, setMessage] = useState('');
    const [targetId, setTargetId] = useState('');
    const [msgdetailModal, setMsgdetailModal] = useState(false);

    const [sendmsgModal, setSendMsgModal] = useState(false); 

    //paging hook
    const [page, setPage] = useState(1);
    const [totalCnt, setTotalCnt] = useState(0);
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




function getSendMSglist(page){
       
        
    axios.get("http://localhost:3000/sendmsglist", { params:{ "pageNumber":page, "id":id } })
    .then(function(resp){
        //console.log(resp.data);
        setSendmsglist(resp.data.list); // map을 return하기 때문(map 안에 list있음)
        setTotalCnt(resp.data.cnt);
       console.log(sendmsglist);

         //alert(bbslist);
    })
    .catch(function(err){
        alert(err);
    })
    
}

const delMsg = (prop) => {
   
    
   // alert("ddd : " + prop);
    //setseq(prop);
 
    axios.get("http://localhost:3000/delMsg", { params:{ "seq":prop } })
    .then(function(resp){
        //console.log(resp.data);
       
      
    if(resp.data === "YES"){
        alert("삭제 성공");
        document.location.href='/sendMessageInfo';
    }else{
        alert("삭제 실패");
    }
    })
    .catch(function(err){
      alert(err);
    })


}

function pageChange(page){
    setPage(page);
   

    getSendMSglist(page-1);

   
    
}

useEffect(function(){
    if(id){

        getSendMSglist(0);  
    
    } if(seq){
        delMsg();
        
    }
                    
}, [id, seq]);// 한번만 호출

const rm = () => {
    
    history('/messageInfo');

  };
  const sm = () => {

    history('/sendMessageInfo');

  };

if(sendmsglist.length > 0){
    return(

        
        <>
 <MsgDetailSendModal sendId={id} targetId={targetId} show={msgdetailModal} title={title} message={message} onHide={()=>setMsgdetailModal(false)}/>
 <MsgSendModal sendId={id} targetId={targetId} show={sendmsgModal} onHide={()=>setSendMsgModal(false)}/>
 
 <Tab label="받은 메시지" onClick={()=>rm()}></Tab>
       <Tab label="보낸 메시지" onClick={()=>sm()}></Tab>
  <br></br>
          <br></br>
  <table className="ttable" border="1" style={{ margin:'0 auto'}}>
        <colgroup>
            <col width='100'/><col width='400'/><col width='200'/>
        </colgroup>
        <thead>
            <tr>
              <th>받는사람</th><th>제목</th><th colSpan="4">보낸날짜</th>
            </tr>
        </thead>

     
        <tbody>
            {
                sendmsglist.map(function(bbs, i){
                    return(
                        <tr key={i}>
                          
                           
                            <td align="center">{bbs.targetId}</td>
                           
                            <td align="center">{bbs.title}</td>
                            <td align="center">{bbs.sendDate}</td>
                            <td align="center"><button type="button"  onClick={()=> delMsg(bbs.seq) } className="btn btn-outline-danger">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3" viewBox="0 0 16 16">
                            ::before
                            <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>
                            </svg>삭제
    
                                </button></td>
                                <td align="center">
                                <button type="button" onClick={()=> {setMsgdetailModal(true); setTargetId(bbs.targetId); setTitle(bbs.title); setMessage(bbs.message)  }  } className="btn btn-primary" >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chat-left-dots" viewBox="0 0 16 16">
                                <path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4.414A2 2 0 0 0 3 11.586l-2 2V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                                <path d="M5 6a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
                                </svg>확인
    
                                </button>


                                </td>
                                <td align="center">
                                <button type="button" onClick={()=> {setSendMsgModal(true); setTargetId(bbs.targetId);}  } className="btn btn-success">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-send" viewBox="0 0 16 16">
                                <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576 6.636 10.07Zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z"/>
                                </svg>


                                </button>
                                
                                
                                </td>
                        </tr>
                    )
                })
            }
        
        </tbody> 
           
    </table> 


    <br>
    </br>

    <Pagination activePage={page}
       itemsCountPerPage={10}
       totalItemsCount={totalCnt}
       pageRangeDisplayed={5}
       prevPageText={"이전"}
       nextPageText={"다음"}
       onChange={pageChange}/> 
           
  

       <br>
       </br>


  </>
    )


        }else{

            return(

        
                <>
        
          
     
  <Tab label="받은 메시지" onClick={()=>rm()}></Tab>
       <Tab label="보낸 메시지" onClick={()=>sm()}></Tab>
          <br></br>
          <br></br>

                <h3>작성된 내용이 없습니다.</h3>
             
              
                <br>
    </br>

    <Pagination activePage={page}
       itemsCountPerPage={10}
       totalItemsCount={totalCnt}
       pageRangeDisplayed={5}
       prevPageText={"이전"}
       nextPageText={"다음"}
       onChange={pageChange}/> 
           
  

       <br>
       </br>

          
        
          </>
            )
        

        }
}
export default SendMessageInfo;