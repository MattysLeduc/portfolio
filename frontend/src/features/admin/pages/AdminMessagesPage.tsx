import { useEffect, useState } from "react";
import { getAllMessages } from "../../contact/api/admin/getAllMessages";
import { markMessageAsRead } from "../../contact/api/admin/markMessageAsRead";
import { deleteMessage } from "../../contact/api/admin/deleteMessage";
import type { ContactMessageResponseModel } from "../../contact/models/ContactMessageResponseModel";
import "./AdminMessagesPage.css";

export const AdminMessagesPage: React.FC = () => {
  const [messages, setMessages] = useState<ContactMessageResponseModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] =
    useState<ContactMessageResponseModel | null>(null);
  const [filter, setFilter] = useState<"all" | "unread" | "read">("all");

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const data = await getAllMessages();
      setMessages(data);
    } catch (error) {
      // Handle error silently
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAsRead = async (messageId: string) => {
    try {
      await markMessageAsRead(messageId);
      setMessages((prev) =>
        prev.map((msg) =>
          msg.messageId === messageId ? { ...msg, read: true } : msg,
        ),
      );
      if (selectedMessage?.messageId === messageId) {
        setSelectedMessage({ ...selectedMessage, read: true });
      }
    } catch (error) {
      // Handle error silently
    }
  };

  const handleDelete = async (messageId: string) => {
    if (!window.confirm("Are you sure you want to delete this message?"))
      return;
    try {
      await deleteMessage(messageId);
      setMessages((prev) => prev.filter((msg) => msg.messageId !== messageId));
      if (selectedMessage?.messageId === messageId) {
        setSelectedMessage(null);
      }
    } catch (error) {
      // Handle error silently
    }
  };

  const filteredMessages = messages.filter((msg) => {
    if (filter === "unread") return !msg.read;
    if (filter === "read") return msg.read;
    return true;
  });

  const unreadCount = messages.filter((msg) => !msg.read).length;

  return (
    <div className="admin-page messages-page">
      <div className="page-header">
        <div>
          <h1>Contact Messages</h1>
          <p>Manage messages from website visitors</p>
        </div>
        {unreadCount > 0 && (
          <div className="unread-badge">
            {unreadCount} unread message{unreadCount !== 1 ? "s" : ""}
          </div>
        )}
      </div>

      <div className="filter-tabs">
        <button
          className={`tab ${filter === "all" ? "active" : ""}`}
          onClick={() => setFilter("all")}
        >
          All ({messages.length})
        </button>
        <button
          className={`tab ${filter === "unread" ? "active" : ""}`}
          onClick={() => setFilter("unread")}
        >
          Unread ({unreadCount})
        </button>
        <button
          className={`tab ${filter === "read" ? "active" : ""}`}
          onClick={() => setFilter("read")}
        >
          Read ({messages.length - unreadCount})
        </button>
        <button className="btn-refresh" onClick={fetchMessages}>
          🔄 Refresh
        </button>
      </div>

      {loading ? (
        <div className="loading">
          <div className="spinner"></div>
          <p>Loading messages...</p>
        </div>
      ) : (
        <div className="messages-container">
          <div className="messages-list">
            {filteredMessages.length === 0 ? (
              <div className="empty-state">
                <p>No messages {filter !== "all" ? `(${filter})` : ""}</p>
              </div>
            ) : (
              filteredMessages.map((msg) => (
                <div
                  key={msg.messageId}
                  className={`message-item ${!msg.read ? "unread" : ""} ${
                    selectedMessage?.messageId === msg.messageId
                      ? "selected"
                      : ""
                  }`}
                  onClick={() => {
                    setSelectedMessage(msg);
                    if (!msg.read) {
                      handleMarkAsRead(msg.messageId!);
                    }
                  }}
                >
                  <div className="message-header">
                    <h3>{msg.name}</h3>
                    {!msg.read && <div className="unread-indicator"></div>}
                  </div>
                  <p className="message-subject">{msg.subject}</p>
                  <p className="message-preview">
                    {msg.message?.substring(0, 100)}...
                  </p>
                  <p className="message-email">{msg.email}</p>
                  <p className="message-date">
                    {msg.createdAt
                      ? new Date(msg.createdAt).toLocaleString()
                      : "Unknown date"}
                  </p>
                </div>
              ))
            )}
          </div>

          <div className="message-detail">
            {selectedMessage ? (
              <>
                <div className="detail-header">
                  <h2>Message Details</h2>
                  <div className="detail-actions">
                    {!selectedMessage.read && (
                      <button
                        className="btn-secondary"
                        onClick={() =>
                          handleMarkAsRead(selectedMessage.messageId!)
                        }
                      >
                        ✓ Mark as Read
                      </button>
                    )}
                    <button
                      className="btn-danger"
                      onClick={() => handleDelete(selectedMessage.messageId!)}
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </div>

                <div className="detail-content">
                  <div className="detail-field">
                    <label>Name</label>
                    <p>{selectedMessage.name}</p>
                  </div>
                  <div className="detail-field">
                    <label>Email</label>
                    <p>
                      <a href={`mailto:${selectedMessage.email}`}>
                        {selectedMessage.email}
                      </a>
                    </p>
                  </div>
                  <div className="detail-field">
                    <label>Subject</label>
                    <p>{selectedMessage.subject}</p>
                  </div>
                  <div className="detail-field">
                    <label>Date</label>
                    <p>
                      {selectedMessage.createdAt
                        ? new Date(selectedMessage.createdAt).toLocaleString()
                        : "Unknown date"}
                    </p>
                  </div>
                  <div className="detail-field">
                    <label>Message</label>
                    <p className="message-body">{selectedMessage.message}</p>
                  </div>

                  <div className="detail-actions-bottom">
                    {!selectedMessage.read && (
                      <button
                        className="btn-secondary"
                        onClick={() =>
                          handleMarkAsRead(selectedMessage.messageId!)
                        }
                      >
                        ✓ Mark as Read
                      </button>
                    )}
                    {selectedMessage.read && (
                      <p className="status-read">✓ Read</p>
                    )}
                    <button
                      className="btn-danger"
                      onClick={() => handleDelete(selectedMessage.messageId!)}
                    >
                      🗑️ Delete Message
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="no-selection">
                <p>Select a message to view details</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
