import React, { useContext, useEffect, useRef } from 'react'
import { AuthContext } from '../context/AuthContext'
import { ChatContext } from '../context/ChatContext';

const Message = ({message}) => {

  const {currentUser} = useContext(AuthContext); //useContext : 내개 필요한 props를 글로벌하게 사용할 수 있음 AuthContext의 currentUser라는 state사용가능
  const {data} = useContext(ChatContext);

  const ref = useRef();

  useEffect(()=>{
    ref.current?.scrollIntoView({behavior:"smooth"})// 메시지 보내면 스크롤 내려오게
  }, [message]);

  console.log(message);
  return (
    <div ref={ref} className={`message ${message.senderId === currentUser.uid && "owner"}`}>
      <div className="messageInfo">
      <img className='img4' src={message.senderId === currentUser.uid ? currentUser.photoURL : data.user.photoURL} alt=""/>
      <span>{message.senderId === currentUser.uid ? currentUser.displayName : data.user.displayName}</span>
      </div>
      <div className="messageContent">
          <p>{message.text}</p>
          {message.img && <img className='img5' src={message.img} alt=""/>}
      </div>
    </div>
  )
}

export default Message