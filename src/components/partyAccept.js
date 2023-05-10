import * as React from 'react';
import {useEffect, useState} from "react";
import axios from 'axios';
import {Link, useNavigate} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Pagination from "react-js-pagination";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';

function PartyAccept(){
    let history = useNavigate();
    const [id, setId] = useState('');
    const [page, setPage] = useState(1);
    const [totalCnt, setTotalCnt] = useState(0);
    const [partyList, setPartyList] = useState([]); 

    const [value, setValue] = React.useState('one');

    const handleChange = (event, newValue) => {
        setValue(newValue);
      };
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

function myPartyList(page){    
    axios.get("http://localhost:3000/myPartyList", { params:{ "pageNumber":page, "id":id } })
    .then(function(resp){
        //console.log(resp.data);
        setPartyList(resp.data.list); // map을 return하기 때문(map 안에 list있음)
        setTotalCnt(resp.data.cnt);
       
         //console.log(requestlist);
    })
    .catch(function(err){
        alert(err);
    })
    
}
const check = (partySeq, applyMem) =>{    
    axios.get("http://localhost:3000/updateCheck", { params:{ "partySeq":partySeq, "applyMem":applyMem } })
    .then(function(resp){
        document.location.href='/partyAccept';
    })
    .catch(function(err){
        alert(err);
    })
    
}
const style = {
    width: '100%',
    maxWidth: 360,
    bgcolor: 'background.paper',
  };
useEffect(function(){
    if(id){

        myPartyList(0);
    
    }
                   
}, [id]);

function pageChange(page){
    setPage(page);
   

    myPartyList(page-1);

   
    
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
  const gobbs = () => {
    
    history('/partyAccept');

  };
  const gofree = () => {

    history('/partyRequest');

  };
if(partyList.length > 0){
    return(

        
        <>
      
      <div className='tabdogae'>
        <Box sx={{ width: '100%' }}>
         <Tabs
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="auto"
        aria-label="scrollable auto tabs example"
        >
        <Tab label="파티 수락" onClick={()=>gobbs()}></Tab>
       <Tab label="파티 요청" onClick={()=>gofree()}></Tab>
       
        </Tabs>
        </Box>
        </div>
        
<div className='mysidemenu'>
          <List sx={style} component="nav" aria-label="mailbox folders">
      <ListItem button>
        <ListItemText primary="회원정보 수정" onClick={()=>goinfo()}/>
      </ListItem>
      <Divider />
      <ListItem button>
        <ListItemText primary="내가 쓴 글" onClick={()=>gomy()}/>
      </ListItem>
      <ListItem button>
        <ListItemText primary="파티원 승인"onClick={()=>goparty()} />
      </ListItem>
      <Divider light />
      <ListItem button>
        <ListItemText primary="내파티 보기"onClick={()=>gomyparty()} />
      </ListItem>
    </List>
    </div>
<div className="gamssagi3">
          <table className='ttable' border="1" style={{ margin:'0 auto'}}>
        <colgroup>
            <col width='70'/><col width='600'/><col width='200'/><col width='100'/><col width='100'/>
        </colgroup>
        <thead>
            <tr>
              <th>아이디</th><th>파티제목</th><th>날짜</th><th>인원수</th><th>수락여부</th>
            </tr>
        </thead>

        <tbody>
            {
                partyList.map(function(bbs, i){
                    return(
                        <tr key={i}>
                            <td align="center">{bbs.applyMem}</td>
                            <td align="center">{bbs.title}</td>
                            <td align="center">{bbs.wdate}</td>
                             <td align="center">{bbs.countMem}/{bbs.totalMem}</td> 

                             {
                                bbs.countMem === bbs.totalMem ?
                                <td align="center">파티완료</td> 
                                :(bbs.check === 1 ?
                                <td align="center">수락됨</td> :
                                <td align="center"><button onClick={()=>{check(bbs.partySeq, bbs.applyMem)}}>수락하기</button></td>)
                             }
                           
                            
                           
                           
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
       </div>
 </>

   
    )
}else{


    return(

        
        <>
    <div className='tabdogae'>
        <Box sx={{ width: '100%' }}>
         <Tabs
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="auto"
        aria-label="scrollable auto tabs example"
        >
        <Tab label="파티 수락" onClick={()=>gobbs()}></Tab>
       <Tab label="파티 요청" onClick={()=>gofree()}></Tab>
       
        </Tabs>
        </Box>
        </div>

        <List sx={style} component="nav" aria-label="mailbox folders">
      <ListItem button>
        <ListItemText primary="회원정보 수정" onClick={()=>goinfo()} />
      </ListItem>
      <Divider />
      <ListItem button>
        <ListItemText primary="내가 쓴 글" onClick={()=>gomy()}/>
      </ListItem>
      <ListItem button>
        <ListItemText primary="파티원 승인" onClick={()=>goparty()}/>
      </ListItem>
      <Divider light />
      <ListItem button>
        <ListItemText primary="내파티 보기" onClick={()=>gomyparty()} />
      </ListItem>
    </List>


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

export default PartyAccept;