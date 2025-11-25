import React, { useState } from 'react';
import { MessageSquare, Plus, Trash2, Edit2, Check, X } from 'lucide-react';
import './ChatHistorySidebar.css';

export function ChatHistorySidebar({ 
  sessions, 
  currentSessionId, 
  onSelectSession, 
  onCreateSession,
  onRenameSession,
  onDeleteSession
}) {
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");

  const handleStartEdit = (e, session) => {
    e.stopPropagation();
    setEditingId(session.sessionId);
    setEditTitle(session.title || "New Conversation");
  };

  const handleSaveEdit = (e, sessionId) => {
    e.stopPropagation();
    if (editTitle.trim()) {
      onRenameSession(sessionId, editTitle);
    }
    setEditingId(null);
  };

  const handleCancelEdit = (e) => {
    e.stopPropagation();
    setEditingId(null);
  };

  const handleDelete = (e, sessionId) => {
    e.stopPropagation();
    if (window.confirm("Are you sure you want to delete this conversation?")) {
      onDeleteSession(sessionId);
    }
  };

  return (
    <div className="chat-history-sidebar">
      <div className="sidebar-header">
        <h3>Conversations</h3>
        <button onClick={onCreateSession} className="new-chat-btn" title="New Chat">
          <Plus size={20} />
        </button>
      </div>
      
      <div className="sessions-list">
        {sessions.map((session) => (
          <div 
            key={session.sessionId} 
            className={`session-item ${session.sessionId === currentSessionId ? 'active' : ''}`}
            onClick={() => onSelectSession(session.sessionId)}
          >
            <MessageSquare size={18} className="session-icon" />
            
            {editingId === session.sessionId ? (
              <div className="session-edit-form" onClick={e => e.stopPropagation()}>
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  autoFocus
                  className="session-edit-input"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleSaveEdit(e, session.sessionId);
                    if (e.key === 'Escape') handleCancelEdit(e);
                  }}
                />
                <div className="session-edit-actions">
                  <button onClick={(e) => handleSaveEdit(e, session.sessionId)} className="action-btn save-btn">
                    <Check size={14} />
                  </button>
                  <button onClick={handleCancelEdit} className="action-btn cancel-btn">
                    <X size={14} />
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="session-info">
                  <span className="session-title">{session.title || "New Conversation"}</span>
                  <span className="session-date">
                    {new Date(session.updatedAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="session-actions">
                  <button 
                    onClick={(e) => handleStartEdit(e, session)} 
                    className="action-btn edit-btn"
                    title="Rename"
                  >
                    <Edit2 size={14} />
                  </button>
                  <button 
                    onClick={(e) => handleDelete(e, session.sessionId)} 
                    className="action-btn delete-btn"
                    title="Delete"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
        
        {sessions.length === 0 && (
          <div className="empty-sessions">
            <p>No conversations yet.</p>
            <button onClick={onCreateSession} className="start-chat-btn">
              Start a new chat
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
