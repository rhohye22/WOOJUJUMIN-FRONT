import { onAuthStateChanged } from "firebase/auth";

import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase";


export const AuthContext = createContext()

export const AuthContextProvider = ({children}) =>{
    const [currentUser, setCurrentUser] = useState({});

    useEffect(()=>{
      const unsub =  onAuthStateChanged(auth,(user)=>{ // onAuthStateChanged : 유저가 로그인 상태인지 확인
            setCurrentUser(user);
            console.log(user);
            
      });
      return () =>{
        unsub();
      }


    }, []);
    return(
        <AuthContext.Provider value={{currentUser}}>
            {children}
            
        </AuthContext.Provider>
    );
};