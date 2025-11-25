import './ChatMessage.css';
import avatarImage from '../../assets/images/avatar.jpg'
import aiAvatar from '../../assets/images/aiAvatar.png'

export function ChatMessage({ sender, text }) {
  const isUser = sender === "user";

  return (
    <div className={`message-container ${isUser ? "user-message" : "other-message"}`}>
      {!isUser && (
        <div className="avatar">
          <img src={aiAvatar} alt="AI" className="avatar-img" />
        </div>
      )}
      <div className={`message-bubble ${isUser ? "user-bubble" : "other-bubble"}`}>
        {text}
      </div>
      {isUser && (
        <div className="avatar">
          <img src={avatarImage} alt="User" className="avatar-img" />
        </div>
      )}
    </div>
  );
}

