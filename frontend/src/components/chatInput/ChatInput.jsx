import { useState } from "react";
import { Send, Paperclip, Smile } from "lucide-react";
import './ChatInput.css';

export function ChatInput({ onSend, disabled }) {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (!message.trim() || disabled) return;
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
    <div className="input-bar">
      <button className="input-icon-btn" title="Attach file" disabled={disabled}>
        <Paperclip size={20} />
      </button>
      
      <input
        type="text"
        className="chat-input-field"
        placeholder="Type your thoughts..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={handleKeyPress}
        disabled={disabled}
      />
      
      <button className="input-icon-btn" title="Add emoji" disabled={disabled}>
        <Smile size={20} />
      </button>
      
      <button 
        className="send-button" 
        onClick={handleSend}
        disabled={!message.trim() || disabled}
      >
        <Send size={20} />
      </button>
    </div>
  );
}
