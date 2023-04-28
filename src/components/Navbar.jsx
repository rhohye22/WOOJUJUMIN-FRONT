import { signOut } from 'firebase/auth'
import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { auth } from '../firebase'

const Navbar = () => {

  const {currentUser} = useContext(AuthContext)
  //console.log("wfwfewf" + JSON.stringify(currentUser));
  return (
    <div className='navbar'>
      <span className='logo'>Party Chat</span>
      <div className='user'>
        <img className='img' src={currentUser.photoURL} alt=''/>
        <span>{currentUser.displayName}</span>
        {/* <button onClick={()=>signOut(auth)}>logout</button> */}
        
      </div>
      </div>
  )
}

export default Navbar