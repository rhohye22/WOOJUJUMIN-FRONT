import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


function FreeBbs() {

    let history = useNavigate();

    const [id, setId] = useState('');


     // login 되어 있는지 검사
        useEffect(() => {
        let login = JSON.parse(localStorage.getItem("login"));
        if(login !== undefined){ // 빈칸이 아닐때
            setId(login.id);
           // alert(id);
        }else{
           // alert('로그인해 주십시오');
            history('/login');
        }

    }, [history]);


    return (
        <div>
            <select>
                <option>잡담</option>
                <option>축구</option>
                
            </select>
        </div>
    );
}

export default FreeBbs;