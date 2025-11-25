import { useState, useRef, useEffect } from "react";
import './ChatPage.css';
import Navbar from "../../components/navbar/NavBar.jsx";
import { ChatMessage } from "../../components/chatMessage/ChatMessage.jsx";
import { ChatInput } from "../../components/chatInput/ChatInput.jsx";
import { useChat } from "../../hooks/useChat.js";

export default function ChatPage() {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hi! I’m here for you ❤️" },
  ]);

  const { sendMessage } = useChat();
  const bottomRef = useRef(null);

  const handleSend = (msg) => {
    setMessages((prev) => [...prev, { sender: "user", text: msg }]);

    sendMessage.mutate(msg, {
      onSuccess: (data) => {
        setMessages((prev) => [...prev, { sender: "bot", text: data.reply }]);
      },
    });
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="chat-page">
      <Navbar />
      <div className="chat-container">
        <div className="chat-header">
          <h2 className="chat-title">Chat</h2>
          <div className="chat-status">
            <span className="status-dot"></span>
            <span className="status-text">AI Companion Online</span>
            <div className="avatar-small">
              
            </div>
          </div>
        </div>
        
        <div className="chat-messages">
          {messages.map((msg, index) => (
            <ChatMessage key={index} sender={msg.sender} text={msg.text} />
          ))}
        </div>
        
        <ChatInput onSend={handleSend} />
      </div>
    </div>
  );
}

// import { useState } from 'react';
// import Navbar from '../components/navbar/NavBar';
// import { ChatMessage } from '../components/chat/ChatMessage';
// import { ChatInput } from '../components/chat/ChatInput';
// import './ChatPage.css';

// export default function ChatPage() {
//   const [messages, setMessages] = useState([
//     { sender: "ai", text: "Hello! I'm here to listen and support you. How are you feeling today?" }
//   ]);

//   const handleSendMessage = (text) => {
//     setMessages([...messages, { sender: "user", text }]);
//     // Simulate AI response
//     setTimeout(() => {
//       setMessages(prev => [...prev, { 
//         sender: "ai", 
//         text: "I hear you. Thank you for sharing that with me." 
//       }]);
//     }, 1000);
//   };

//   return (
//     <div className="chat-page">
//       <Navbar />
//       <div className="chat-container">
//         <div className="chat-header">
//           <h2 className="chat-title">Chat</h2>
//           <div className="chat-status">
//             <span className="status-dot"></span>
//             <span className="status-text">AI Companion Online</span>
//             <div className="avatar-small">
//               <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
//                 <circle cx="20" cy="20" r="20" fill="#2C6B6B"/>
//                 <circle cx="20" cy="15" r="5" fill="white"/>
//                 <path d="M12 28C12 24 15 22 20 22C25 22 28 24 28 28" stroke="white" strokeWidth="2" fill="none"/>
//               </svg>
//             </div>
//           </div>
//         </div>
        
//         <div className="chat-messages">
//           {messages.map((msg, index) => (
//             <ChatMessage key={index} sender={msg.sender} text={msg.text} />
//           ))}
//         </div>
        
//         <ChatInput onSend={handleSendMessage} />
//       </div>
//     </div>
//   );
// } 