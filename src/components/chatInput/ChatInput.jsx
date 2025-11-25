import { useState } from "react";
import { Send, Paperclip, Smile } from "lucide-react";
import './ChatInput.css';

export function ChatInput({ onSend }) {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (!message.trim()) return;
    onSend(message);
    setMessage("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="chat-input-container">
      <div className="chat-input-wrapper">
        <button className="input-icon-btn" title="Attach file">
          <Paperclip size={20} />
        </button>
        
        <input
          type="text"
          className="chat-input"
          placeholder="Type your thoughts..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        
        <button className="input-icon-btn" title="Add emoji">
          <Smile size={20} />
        </button>
        
        <button 
          className="send-button" 
          onClick={handleSend}
          disabled={!message.trim()}
        >
          <Send size={20} />
        </button>
      </div>
    </div>
  );
}
