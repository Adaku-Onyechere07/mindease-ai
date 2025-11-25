import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './ChatPage.css';
import Navbar from "../../components/navbar/NavBar.jsx";
import { ChatMessage } from "../../components/chatMessage/ChatMessage.jsx";
import { ChatInput } from "../../components/chatInput/ChatInput.jsx";
import { ChatHistorySidebar } from "../../components/chatHistorySidebar/ChatHistorySidebar.jsx";
import { useChat } from "../../hooks/useChat.js";
import aiAvatar from '../../assets/images/aiAvatar.png';

export default function ChatPage() {
  const [messages, setMessages] = useState([]);
  const [sessionId, setSessionId] = useState(null);
  const navigate = useNavigate();

  const { createSession, sendMessage, renameSession, deleteSession, sessions, currentSession } = useChat(sessionId);
  const bottomRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
        navigate('/login');
        return;
    }
  }, [navigate]);

  // Load existing session or create new one
  useEffect(() => {
    if (!sessionId && sessions.data?.data?.sessions?.length > 0) {
      // Use the most recent session if none selected
      setSessionId(sessions.data.data.sessions[0].sessionId);
    } else if (!sessionId && sessions.isSuccess && sessions.data?.data?.sessions?.length === 0) {
      // Only create if we know there are no sessions
      handleCreateSession();
    }
  }, [sessions.data, sessions.isSuccess]);

  // Load messages when session is selected
  useEffect(() => {
    if (currentSession.isLoading) return;

    if (currentSession.data?.data?.session?.messages) {
      const loadedMessages = currentSession.data.data.session.messages.map(msg => ({
        sender: msg.sender,
        text: msg.content
      }));
      setMessages(loadedMessages);
    } else {
       // Default welcome message if new session or empty
       setMessages([{ sender: "bot", text: "Hi! I’m here for you ❤️" }]);
    }
  }, [currentSession.data, currentSession.isLoading, sessionId]);

  const handleCreateSession = () => {
    createSession.mutate(undefined, {
      onSuccess: (data) => {
          if (data.success && data.data.session) {
              setSessionId(data.data.session.sessionId);
              // Messages will be set by the useEffect above when currentSession fetches (or defaults)
              // But since we just created it, it's empty on server.
              // We can manually set it here to be faster, but the useEffect will handle it.
              sessions.refetch(); // Refresh list
          }
      },
      onError: (error) => {
          console.error("Failed to create session:", error);
      }
    });
  };

  const handleRenameSession = (id, newTitle) => {
    renameSession.mutate({ sessionId: id, title: newTitle });
  };

  const handleDeleteSession = (id) => {
    deleteSession.mutate(id, {
      onSuccess: () => {
        if (id === sessionId) {
          setSessionId(null); // Will trigger the useEffect to select another session or create new
        }
      }
    });
  };

  const handleSend = (msg) => {
    if (!sessionId) {
        console.error("No active session");
        return;
    }

    setMessages((prev) => [...prev, { sender: "user", text: msg }]);

    sendMessage.mutate({ sessionId, message: msg }, {
      onSuccess: (data) => {
        if (data.success && data.data.botMessage) {
            setMessages((prev) => [...prev, { sender: "bot", text: data.data.botMessage.content }]);
            sessions.refetch(); // Refresh list to update title/order
        }
      },
      onError: (error) => {
        console.error("Failed to send message:", error);
        setMessages((prev) => [...prev, { sender: "bot", text: "Sorry, I'm having trouble connecting right now." }]);
      }
    });
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="chat-page">
      <Navbar />
      <div className="chat-layout">
        <ChatHistorySidebar 
          sessions={sessions.data?.data?.sessions || []}
          currentSessionId={sessionId}
          onSelectSession={setSessionId}
          onCreateSession={handleCreateSession}
          onRenameSession={handleRenameSession}
          onDeleteSession={handleDeleteSession}
        />
        
        <div className="chat-main-area">
          <div className="chat-header">
            <div className="chat-status">
              <span className="status-dot"></span>
              <span className="status-text">AI Companion Online</span>
            </div>
          </div>
          
          <div className="chat-messages">
            {messages.map((msg, index) => (
              <ChatMessage key={index} sender={msg.sender} text={msg.text} />
            ))}
            
            {sendMessage.isPending && (
              <div className="message-container other-message">
                <div className="avatar">
                  <img src={aiAvatar} alt="AI" className="avatar-img" />
                </div>
                <div className="message-bubble other-bubble typing-indicator">
                  <div className="typing-dot"></div>
                  <div className="typing-dot"></div>
                  <div className="typing-dot"></div>
                </div>
              </div>
            )}
            
            <div ref={bottomRef} />
          </div>
          
          <div className="chat-input-wrapper">
            <ChatInput onSend={handleSend} disabled={!sessionId || sendMessage.isPending} />
          </div>
        </div>
      </div>
    </div>
  );
}
 