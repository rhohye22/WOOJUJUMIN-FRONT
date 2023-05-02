import React, { useContext} from 'react'
import Messages from '../components/Messages'
import Input from '../components/Input';
import { ChatContext } from '../context/ChatContext';
const Chat = () => {

  const {data} = useContext(ChatContext);


  return (
    <div className='chat'>
      <div className="chatInfo">
          <span>{data.user?.displayName}</span>
          <div className="chaticons">
          
        

          </div>
      </div>
          <Messages/>
          <Input/>
      
      </div>
  )
}

export default Chat