import * as React from 'react';
import {useEffect, useState} from "react";
import axios from 'axios';
import {Link, useNavigate} from "react-router-dom";
import Pagination from "react-js-pagination";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import "./page.css";
import "./accountInfo.css";




//npm install @mui/material @emotion/react @emotion/styled --legacy-peer-deps
//npm install @mui/icons-material --legacy-peer-deps
function MyBbsList(){

    let history = useNavigate();
    const [bbslist, setBbslist] = useState([]); // 게시판은 배열로 넘어오니까 
    const [choice, setChoice] = useState('');
    const [search, setSearch] = useState('');
    
    //paging hook
    const [page, setPage] = useState(1);
    const [totalCnt, setTotalCnt] = useState(0);

    const [id, setId] = useState('');
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


    
    function getBbslist(choice, search, page){
       
        
        axios.get("http://localhost:3000/myBbslist", { params:{ "choice":choice, "search":search, "pageNumber":page, "id":id } })
        .then(function(resp){
            //console.log(resp.data);
            setBbslist(resp.data.list); // map을 return하기 때문(map 안에 list있음)
            setTotalCnt(resp.data.cnt);
             console.log(bbslist);
        })
        .catch(function(err){
            alert(err);
        })
        
    }
    
    
    function pageChange(page){
        setPage(page);
        getBbslist(choice, search, page-1);
    }
    
    function searchBtn(){
        
        getBbslist(choice, search, 0);
    }
   
    const style = {
        width: '100%',
        maxWidth: 360,
        bgcolor: 'background.paper',
      };
    useEffect(function(){
        if(id){

            getBbslist("", "", 0);  // 실행할 내용 => 컴포넌트가 처음으로 마운트되었을때 실행. 이경우에만 실행되고 다른 경우는 실행 안되므로 초기에 한번만 실행시
        
        }
                        // 시킬때 이런 식으로 사용, 처음 들어오면 검색어와 페이징이 안들어옴
    }, [id]);// 한번만 호출
    
    
    if(bbslist.length > 0){

    return(
        <>
        <Link to="/accountInfo">회원정보 수정</Link>&nbsp;&nbsp;&nbsp;
          <Link to="/mybbsList">내가 쓴 글</Link>&nbsp;&nbsp;&nbsp;
          <Link to="/partyAccept">파티원 승인</Link>&nbsp;&nbsp;&nbsp;
          <Link to="/partyList">내파티 보기</Link>

          <br></br>
          <br></br>
          <Link to="/mybbsList">모집 게시판</Link>&nbsp;&nbsp;&nbsp;
        <Link to="/myfreebbsList">자유 게시판</Link>&nbsp;&nbsp;&nbsp;

        <Box sx={{ width: '100%' }}>
         <Tabs
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="auto"
        aria-label="scrollable auto tabs example"
        >
        <Tab label="모집 게시판"></Tab>
       <Tab label="자유 게시판"></Tab>
       
        </Tabs>
        </Box>
        <List sx={style} component="nav" aria-label="mailbox folders">
      <ListItem button>
        <ListItemText primary="회원정보 수정" />
      </ListItem>
      <Divider />
      <ListItem button>
        <ListItemText primary="내가 쓴 글" />
      </ListItem>
      <ListItem button>
        <ListItemText primary="파티원 승인" />
      </ListItem>
      <Divider light />
      <ListItem button>
        <ListItemText primary="내파티 보기" />
      </ListItem>
    </List>

    <br></br>
    <div className='gamssagi2'>
        <select value={choice} onChange={(e)=>setChoice(e.target.value)}>
            <option value=''>검색</option>
            <option value="title">제목</option>
            <option value="content">내용</option>
            <option value="writer">작성자</option>

        </select>&nbsp;
        <input value={search} onChange={(e)=>setSearch(e.target.value)} placeholder="검색어"/>

        <button onClick={searchBtn}>검색</button>


    <br></br>
    <br></br>

  
    <table>
        <colgroup>
            <col width='70'/><col width='600'/><col width='100'/><col width='100'/><col width='100'/><col width='100'/>
        </colgroup>
        <thead>
            <tr>
              <th>번호</th><th>제목</th><th>조회수</th><th>인원수</th><th>날짜</th><th>작성자</th>
            </tr>
        </thead>

        <tbody>
            {
                bbslist.map(function(bbs, i){
                    return(
                        <tr key={i}>
                            <td align="center">{i + 1}</td>
                            <td align="left">
                               <Link to={`/bbsdetail/${bbs.seq}`}> {bbs.title}</Link>
                            
                            </td>
                            <td align="center">{bbs.readcount}</td>
                            <td align="center">{bbs.people}</td>
                            <td align="center">{bbs.wdate.substring(0,10)}</td>
                            <td align="center">{bbs.id}</td>
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
       </div>

</>

    )
}else{


    return(

        
        <>
        <Link to="/accountInfo">회원정보 수정</Link>&nbsp;&nbsp;&nbsp;
          <Link to="/mybbsList">내가 쓴 글</Link>&nbsp;&nbsp;&nbsp;
          <Link to="/partyAccept">파티원 승인</Link>&nbsp;&nbsp;&nbsp;
          <Link to="/partyList">내파티 보기</Link>

          <br></br>
          <br></br>
          <Link to="/mybbsList">모집 게시판</Link>&nbsp;&nbsp;&nbsp;
          <Link to="/myfreebbsList">자유 게시판</Link>&nbsp;&nbsp;&nbsp;
  
   

    <br></br>
       

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

</>



   
    )
}
}

export default MyBbsList;