import { useState, useRef, useEffect } from "react";
import "./Chatbot.css";
import reynImg from "../../assets/reynimg.png";

const AiSparkleIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
  </svg>
);

// ── Strip markdown symbols from bot replies ──────────────────────
function cleanText(text) {
  return text
    .replace(/\*\*(.*?)\*\*/g, "$1")   // **bold**
    .replace(/\*(.*?)\*/g, "$1")        // *italic*
    .replace(/__(.*?)__/g, "$1")        // __bold__
    .replace(/_(.*?)_/g, "$1")          // _italic_
    .replace(/`{1,3}(.*?)`{1,3}/g, "$1") // `code` / ```code```
    .replace(/#{1,6}\s*/g, "")          // ## headings
    .replace(/^\s*[-•*]\s+/gm, "• ")   // bullet lists → clean bullet
    .replace(/^\s*\d+\.\s+/gm, "")     // numbered lists
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1") // [link](url) → link text
    .replace(/>\s*/g, "")               // blockquotes
    .replace(/---+/g, "")               // horizontal rules
    .replace(/\n{3,}/g, "\n\n")         // excess blank lines
    .trim();
}

// ── Quick suggestion chips ────────────────────────────────────────
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

  // Message limit logic
  const MAX_MESSAGES = 10;
  const userMessageCount = messages.filter(m => m.sender === "user").length;
  const isLimitReached = userMessageCount >= MAX_MESSAGES;

  // Scroll to bottom and persist
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
    localStorage.setItem("chatMessages", JSON.stringify(messages));
  }, [messages]);

  const sendMessage = async (text) => {
    const msgText = (text || input).trim();
    if (!msgText || isLoading) return;

    if (isLimitReached) {
      alert("You have reached the maximum number of messages for this session.");
      return;
    }

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
      const res = await fetch(
        "http://localhost:5000/chat",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: msgText }),
        }
      );

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
      {/* ── Floating Action Button ── */}
      {!isOpen && (
        <button
          className={`chatbot-fab ${darkMode ? "dark" : ""}`}
          onClick={() => setIsOpen(true)}
          aria-label="Open chat"
        >
          <span className="fab-icon" style={{ display: "flex" }}>
            <AiSparkleIcon />
          </span>
          <span className="fab-pulse" />
        </button>
      )}

      {/* ── Chat Window ── */}
      {isOpen && (
        <div className="chat-overlay" onClick={() => setIsOpen(false)}>
          <div
            className={`chatbot-box ${darkMode ? "dark" : ""}`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="chat-header">
              <div className="bot-profile">
                <div className="bot-avatar-wrap">
                  <img src={reynImg} alt="Reyn" className="bot-img" />
                  <span className="online-dot" />
                </div>
                <div className="bot-info">
                  <span className="bot-name">Chat with Reyn</span>
                  <span className="bot-status">Online · Replies instantly</span>
                </div>
              </div>

              <div className="header-actions">
                <button
                  className="header-btn clear-btn"
                  onClick={clearChat}
                  title="Clear chat"
                >
                  🗑
                </button>
                <button
                  className="header-btn close-btn"
                  onClick={() => setIsOpen(false)}
                  title="Close"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="chat-area">
              {messages.map((msg, i) => (
                <div key={i} className={`msg-wrapper ${msg.sender}`}>
                  {msg.sender === "bot" && (
                    <img src={reynImg} alt="Reyn" className="msg-img" />
                  )}
                  <div className={`msg ${msg.sender}`}>
                    {msg.typing ? (
                      <div className="typing">
                        <span className="typing-dot" />
                        <span className="typing-dot" />
                        <span className="typing-dot" />
                      </div>
                    ) : (
                      <>
                        <p className="msg-text">{msg.text}</p>
                        <div className="timestamp">{msg.time}</div>
                      </>
                    )}
                  </div>
                </div>
              ))}

              {/* Quick suggestions */}
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
                Chat limit reached (10/10). Please clear the chat to start over.
              </div>
            )}

            {/* Input */}
            <div className="input-area">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={isLimitReached ? "Limit reached..." : "Ask me anything…"}
                rows={1}
                onKeyDown={handleKeyDown}
                disabled={isLoading || isLimitReached}
              />
              <button
                className={`send-btn ${isLoading ? "loading" : ""}`}
                onClick={() => sendMessage()}
                disabled={isLoading || isLimitReached || !input.trim()}
                aria-label="Send"
              >
                {isLoading ? (
                  <span className="send-spinner" />
                ) : (
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
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
