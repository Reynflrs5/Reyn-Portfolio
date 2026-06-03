import { useState, useRef, useEffect } from "react";
import "./Chatbot.css";
import reynImg from "../../assets/reynimg.png";

// ── Neural AI Icon — custom SVG brain/network ──────────────────
const AiNeuralIcon = ({ size = 26 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 28 28"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    {/* Center ring */}
    <circle cx="14" cy="14" r="5.5" stroke="rgba(255,255,255,0.9)" strokeWidth="1.5" fill="none" />
    {/* Cardinal spokes */}
    <line x1="14" y1="4" x2="14" y2="8.5" stroke="rgba(255,255,255,0.75)" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="14" y1="19.5" x2="14" y2="24" stroke="rgba(255,255,255,0.75)" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="4" y1="14" x2="8.5" y2="14" stroke="rgba(255,255,255,0.75)" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="19.5" y1="14" x2="24" y2="14" stroke="rgba(255,255,255,0.75)" strokeWidth="1.5" strokeLinecap="round" />
    {/* Diagonal spokes */}
    <line x1="6.5" y1="6.5" x2="10.1" y2="10.1" stroke="rgba(255,255,255,0.45)" strokeWidth="1.2" strokeLinecap="round" />
    <line x1="21.5" y1="6.5" x2="17.9" y2="10.1" stroke="rgba(255,255,255,0.45)" strokeWidth="1.2" strokeLinecap="round" />
    <line x1="6.5" y1="21.5" x2="10.1" y2="17.9" stroke="rgba(255,255,255,0.45)" strokeWidth="1.2" strokeLinecap="round" />
    <line x1="21.5" y1="21.5" x2="17.9" y2="17.9" stroke="rgba(255,255,255,0.45)" strokeWidth="1.2" strokeLinecap="round" />
    {/* Cardinal nodes */}
    <circle cx="14" cy="4" r="2" fill="rgba(165,180,252,0.95)" />
    <circle cx="14" cy="24" r="2" fill="rgba(165,180,252,0.95)" />
    <circle cx="4" cy="14" r="2" fill="rgba(165,180,252,0.95)" />
    <circle cx="24" cy="14" r="2" fill="rgba(165,180,252,0.95)" />
    {/* Diagonal nodes */}
    <circle cx="6.5" cy="6.5" r="1.5" fill="rgba(139,92,246,0.85)" />
    <circle cx="21.5" cy="6.5" r="1.5" fill="rgba(139,92,246,0.85)" />
    <circle cx="6.5" cy="21.5" r="1.5" fill="rgba(139,92,246,0.85)" />
    <circle cx="21.5" cy="21.5" r="1.5" fill="rgba(139,92,246,0.85)" />
    {/* Core */}
    <circle cx="14" cy="14" r="2.2" fill="rgba(255,255,255,0.95)" />
  </svg>
);

// ── Small avatar version of neural icon ───────────────────────
const AiAvatarIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <circle cx="8" cy="8" r="3" stroke="rgba(255,255,255,0.9)" strokeWidth="1.2" fill="none" />
    <line x1="8" y1="2" x2="8" y2="5" stroke="rgba(255,255,255,0.8)" strokeWidth="1.2" strokeLinecap="round" />
    <line x1="8" y1="11" x2="8" y2="14" stroke="rgba(255,255,255,0.8)" strokeWidth="1.2" strokeLinecap="round" />
    <line x1="2" y1="8" x2="5" y2="8" stroke="rgba(255,255,255,0.8)" strokeWidth="1.2" strokeLinecap="round" />
    <line x1="11" y1="8" x2="14" y2="8" stroke="rgba(255,255,255,0.8)" strokeWidth="1.2" strokeLinecap="round" />
    <circle cx="8" cy="8" r="1.2" fill="rgba(255,255,255,0.95)" />
  </svg>
);

// ── Strip markdown from bot replies ───────────────────────────
function cleanText(text) {
  return text
    .replace(/\*\*(.*?)\*\*/g, "$1")
    .replace(/\*(.*?)\*/g, "$1")
    .replace(/__(.*?)__/g, "$1")
    .replace(/_(.*?)_/g, "$1")
    .replace(/`{1,3}(.*?)`{1,3}/g, "$1")
    .replace(/#{1,6}\s*/g, "")
    .replace(/^\s*[-•*]\s+/gm, "• ")
    .replace(/^\s*\d+\.\s+/gm, "")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/>\s*/g, "")
    .replace(/---+/g, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

const SUGGESTIONS = [
  "Who are you?",
  "What's your tech stack?",
  "Show me your projects",
  "How can I contact you?",
];

function Chatbot({ darkMode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem("chatMessages");
    return saved
      ? JSON.parse(saved)
      : [
        {
          sender: "bot",
          text: "Hi there! 👋 I'm Jashley Rain Flores — a 3rd-year IT student at Pampanga State University. Feel free to ask me anything!",
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ];
  });
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef(null);
  const textareaRef = useRef(null);

  const MAX_MESSAGES = 10;
  const userMessageCount = messages.filter((m) => m.sender === "user").length;
  const isLimitReached = userMessageCount >= MAX_MESSAGES;

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
    localStorage.setItem("chatMessages", JSON.stringify(messages));
  }, [messages]);

  // Auto-resize textarea
  useEffect(() => {
    const ta = textareaRef.current;
    if (!ta) return;
    ta.style.height = "auto";
    ta.style.height = Math.min(ta.scrollHeight, 120) + "px";
  }, [input]);

  const sendMessage = async (text) => {
    const msgText = (text || input).trim();
    if (!msgText || isLoading || isLimitReached) return;

    const userMsg = {
      sender: "user",
      text: msgText.slice(0, 500),
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [
      ...prev,
      userMsg,
      { sender: "bot", text: "typing", typing: true },
    ]);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("http://localhost:5000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: msgText }),
      });

      const data = await res.json();
      await new Promise((r) => setTimeout(r, 800 + Math.random() * 700));

      setMessages((prev) =>
        prev.map((msg) =>
          msg.typing
            ? {
              sender: "bot",
              text: cleanText(data.reply),
              time: new Date().toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              }),
            }
            : msg
        )
      );
    } catch {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.typing
            ? {
              sender: "bot",
              text: "Oops! I couldn't reach the server. Please try again in a moment.",
              time: new Date().toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              }),
            }
            : msg
        )
      );
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    const welcome = {
      sender: "bot",
      text: "Chat cleared! 👋 How can I help you?",
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    setMessages([welcome]);
    localStorage.removeItem("chatMessages");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
    if (e.key === "Escape") setIsOpen(false);
  };

  const showSuggestions = messages.length <= 1;

  return (
    <>
      {/* ── FAB ── */}
      {!isOpen && (
        <button
          className={`chatbot-fab${darkMode ? " dark" : ""}`}
          onClick={() => setIsOpen(true)}
          aria-label="Open AI chat"
        >
          <span className="fab-pulse" />
          <AiNeuralIcon size={28} />
        </button>
      )}

      {/* ── Chat Window ── */}
      {isOpen && (
        <div
          className="chat-overlay"
          onClick={() => setIsOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="AI Chatbot"
        >
          <div
            className={`chatbot-box${darkMode ? " dark" : ""}`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="chat-header">
              <div className="bot-profile">
                <div className="bot-avatar-wrap">
                  <div className="avatar-ring">
                    <div className="avatar-inner">
                      {reynImg ? (
                        <img src={reynImg} alt="Reyn" className="bot-img" />
                      ) : (
                        <AiNeuralIcon size={26} />
                      )}
                    </div>
                  </div>
                  <span className="online-dot" />
                </div>
                <div className="bot-info">
                  <span className="bot-name">Reyn AI</span>
                  <span className="bot-status">
                    <span className="status-dot" />
                    Online · Replies instantly
                  </span>
                </div>
              </div>

              <div className="header-actions">
                <button
                  className="header-btn"
                  onClick={clearChat}
                  title="Clear chat"
                  aria-label="Clear chat"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" /><path d="M10 11v6" /><path d="M14 11v6" /><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
                  </svg>
                </button>
                <button
                  className="header-btn"
                  onClick={() => setIsOpen(false)}
                  title="Close"
                  aria-label="Close chat"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="chat-area">
              <div className="date-divider"><span>Today</span></div>

              {messages.map((msg, i) => (
                <div key={i} className={`msg-wrapper ${msg.sender}`}>
                  {msg.sender === "bot" && (
                    <div className="msg-avatar">
                      <AiAvatarIcon size={16} />
                    </div>
                  )}
                  <div className="msg-bubble-wrap">
                    <div className={`msg ${msg.sender}`}>
                      {msg.typing ? (
                        <div className="typing">
                          <span className="typing-dot" />
                          <span className="typing-dot" />
                          <span className="typing-dot" />
                        </div>
                      ) : (
                        <p className="msg-text">{msg.text}</p>
                      )}
                    </div>
                    {!msg.typing && (
                      <span className="timestamp">{msg.time}</span>
                    )}
                  </div>
                </div>
              ))}

              {showSuggestions && (
                <div className="suggestions">
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      className="suggestion-chip"
                      onClick={() => sendMessage(s)}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}

              <div ref={chatEndRef} />
            </div>

            {/* Limit Warning */}
            {isLimitReached && (
              <div className="limit-warning">
                Chat limit reached (10/10). Clear the chat to continue.
              </div>
            )}

            {/* Input */}
            <div className="input-area">
              <textarea
                ref={textareaRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={isLimitReached ? "Limit reached…" : "Ask me anything…"}
                rows={1}
                onKeyDown={handleKeyDown}
                disabled={isLoading || isLimitReached}
                aria-label="Chat message"
              />
              <button
                className={`send-btn${isLoading ? " loading" : ""}`}
                onClick={() => sendMessage()}
                disabled={isLoading || isLimitReached || !input.trim()}
                aria-label="Send message"
              >
                {isLoading ? (
                  <span className="send-spinner" />
                ) : (
                  <svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor">
                    <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Chatbot;