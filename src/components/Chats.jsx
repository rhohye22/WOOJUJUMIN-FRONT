import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext';
import { doc, onSnapshot } from "firebase/firestore";
import {db} from "../firebase";
import { ChatContext } from '../context/ChatContext';
const Chats = () => {

  const [chats, setChats] = useState([]);
  const {currentUser} = useContext(AuthContext);
  const {dispatch} = useContext(ChatContext);

  useEffect(()=>{
    const getChats = () => {
    const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => { // onSnapshot : 실시간 작동하는거
      setChats(doc.data());
    //  alert(JSON.stringify(doc.data()));
    //  alert(currentUser.uid);
  });
    return () => {
      unsub();
    };
  }; 
    currentUser.uid && getChats();
  }, [currentUser.uid]);

 
  console.log("object" + Object.entries(chats)); // object is null 
  const handleSelect = (u) =>{

    dispatch({type:"CHANGE_USER", payload: u})
  }


  return (
    <div className='chats'>
      {Object.entries(chats)?.sort((a,b)=>b[1].date - a[1].date).map((chat) => ( // 가장 최근에 보낸거 위로가게게

        <div className="userChat" key={chat[0]} onClick={()=>handleSelect(chat[1].userInfo)}>
        <img className='img2' src={chat[1].userInfo.photoURL}alt=''/>
          <div className="userChatInfo">
             <span className='dname'>{chat[1].userInfo.displayName}</span>
             <p className='pname'>{chat[1].lastMessage?.text}</p>
           </div>
      </div>
    ))}
    </div>
  )
}

export default Chats