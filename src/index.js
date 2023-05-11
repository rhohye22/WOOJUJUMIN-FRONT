import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AuthContextProvider } from './context/AuthContext';
import { ChatContextProvider } from './context/ChatContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
// Context로 감싸 하위에 있는 컴포넌트가 컨텍스트 정보에 접근할 수 있도록 함
root.render(

    <AuthContextProvider>
        <ChatContextProvider> 
    <App />
    </ChatContextProvider>
    </AuthContextProvider>
  
);


reportWebVitals();
