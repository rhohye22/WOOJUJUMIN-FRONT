import {useEffect, useState} from "react";
import axios from 'axios';
import {Link, useNavigate} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Pagination from "react-js-pagination";


function PartyRequest(){
    let history = useNavigate();
    const [id, setId] = useState('');

    const [requestlist, setRequestlist] = useState([]); 
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
function myRequestList(){
       
        
    axios.get("http://localhost:3000/myRequestList", { params:{ "pageNumber":page, "id":id } })
    .then(function(resp){
        //console.log(resp.data);
        setRequestlist(resp.data.list); // map을 return하기 때문(map 안에 list있음)
        setTotalCnt(resp.data.cnt);
         console.log(requestlist);
    })
    .catch(function(err){
        alert(err);
    })
    
}
useEffect(function(){
    if(id){

        myRequestList("", "", 0);
    
    }
                   
}, [id]);

function pageChange(page){
    setPage(page);
   

    myRequestList(page-1);

   
    
}
if(requestlist.length > 0){
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
          <br></br>
          <br></br>

          <table border="1" style={{ margin:'0 auto'}}>
        <colgroup>
            <col width='70'/><col width='600'/><col width='100'/><col width='100'/>
        </colgroup>
        <thead>
            <tr>
              <th>번호</th><th>파티제목</th><th>수락여부</th><th>모집여부</th>
            </tr>
        </thead>

        <tbody>
            {
                requestlist.map(function(bbs, i){
                    return(
                        <tr key={i}>
                            <td align="center">{i + 1}</td>
                            <td align="left">
                               <Link to={`/bbsdetail/${bbs.seq}`}> {bbs.title}</Link>
                            
                            </td>
                            <td align="center">{bbs.readcount}</td>
                            <td align="center">{bbs.people}</td>
                           
                        </tr>
                    )
                })
            }

        </tbody>

    </table>


    <br></br>
    <Pagination activePage={page}
       itemsCountPerPage={10}
       totalItemsCount={totalCnt}
       pageRangeDisplayed={5}
       prevPageText={"이전"}
       nextPageText={"다음"}
       onChange={pageChange}/> 
 </>

   
    )
}else{


    return(

        
        <>

  
<Link to="/partyAccept">파티 수락</Link>&nbsp;&nbsp;&nbsp;
          <Link to="/partyRequest">파티 요청</Link>&nbsp;&nbsp;&nbsp;

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

export default PartyRequest;