import { async } from '@firebase/util';
import { arrayUnion, doc, serverTimestamp, Timestamp, updateDoc } from 'firebase/firestore';
import React, { useContext, useState } from 'react'
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';
import { db, storage } from '../firebase';
import { v4 as uuid } from 'uuid';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';

const Input = () => {

  const [text, setText] = useState("");
  const [img, setImg] = useState(null);

  const {currentUser} = useContext(AuthContext);
  const {data} = useContext(ChatContext);

  const handleSend = async() =>{

    if(img){
      const storageRef = ref(storage, uuid());
        
      const uploadTask = uploadBytesResumable(storageRef, img);

      uploadTask.on(
                   
        (error) => {
          //setErr(true);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then( async (downloadURL) => { 
          await updateDoc(doc(db,"chats", data.chatId),{
            messages: arrayUnion({
              id:uuid(),
              text,
              senderId:currentUser.uid,
              date:Timestamp.now(),
              img:downloadURL,
            }),
          });

            
          });
        } 
        );

    }else{
      await updateDoc(doc(db,"chats", data.chatId),{
        messages: arrayUnion({
          id:uuid(),
          text,
          senderId:currentUser.uid,
          date:Timestamp.now(),
        }),
      });
    }
    await updateDoc(doc(db,"userChats", currentUser.uid),{
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId+".date"]:serverTimestamp(),
    });
    await updateDoc(doc(db,"userChats", data.user.uid),{
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId+".date"]:serverTimestamp(),
    });

    setText("");
    setImg(null);
  };

  return (
    <div className='input'>
      <input className='input1' type="text" placeholder='Type something...' onChange={e=>setText(e.target.value)} value={text}/>
      <div className="send">
        <input type="file" style={{display:"none"}} id="file" onChange={e=>setImg(e.target.files[0])}/>
        <label htmlFor='file'>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-paperclip" viewBox="0 0 16 16">
  <path d="M4.5 3a2.5 2.5 0 0 1 5 0v9a1.5 1.5 0 0 1-3 0V5a.5.5 0 0 1 1 0v7a.5.5 0 0 0 1 0V3a1.5 1.5 0 1 0-3 0v9a2.5 2.5 0 0 0 5 0V5a.5.5 0 0 1 1 0v7a3.5 3.5 0 1 1-7 0V3z"/>
</svg>
          
         

        </label>
        <button onClick={handleSend} className='button3'>Send</button>
      </div>
    </div>
  )
}

export default Input