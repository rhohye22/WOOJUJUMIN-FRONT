import { onAuthStateChanged } from "firebase/auth";

import { createContext, useContext, useEffect, useReducer, useState } from "react";
import { auth } from "../firebase";
import { AuthContext } from "./AuthContext";


export const ChatContext = createContext()
export const ChatContextProvider = ({children}) =>{
    
    const {currentUser} = useContext(AuthContext);
    const INITIAL_STATE ={
        chatId:"null",
        user: {},
    }
    const chatReducer = (state, action) =>{
        switch(action.type){
            case "CHANGE_USER":
                return{
                    user:action.payload,
                    chatId:
                    currentUser.uid > action.payload.uid
                    ? currentUser.uid + action.payload.uid
                    : action.payload.uid + currentUser.uid,
                };
                default:
                    return state;
        }
    };
    const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE); // useState의 대체 함수이다. 
    //                                                                  보통 숫자형이나 문자열 같은 간단한 형태의 데이터는
                                                      // useState를 이용하지만 객체와 같이 복잡한 형태의 데이터를 다룰 때 Reducer을 많이 사용

    return(
        <ChatContext.Provider value={{data:state, dispatch}}>
            {children}
        </ChatContext.Provider>
    );
};