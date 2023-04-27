import {useEffect, useState} from "react";
import axios from 'axios';
import {Link, useNavigate, useParams} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';





function BankaccountInfo(){

    let history = useNavigate();
    
    const [id, setId] = useState('');
    const [targetId, setTargetId] = useState('');
    
    const [memberlist, setMemberlist] = useState([]); // 게시판은 배열로 넘어오니까 

    const [msgModal, setMsgModal] = useState(false); // 기본적으로 모달창이 꺼져있어서 false
    let params = useParams();

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
   

    return(
        
        <>
       
<h2>erfwf</h2>

 </>

   
    )

}

export default BankaccountInfo;