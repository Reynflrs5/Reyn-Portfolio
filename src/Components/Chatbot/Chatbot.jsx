import { useState, useRef, useEffect } from "react";
import "./Chatbot.css";
import reynImg from "../../assets/reynimg.png";

function Chatbot({ darkMode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem("chatMessages");
    return saved
      ? JSON.parse(saved)
      : [
          {
            sender: "bot",
            text: "Hi 👋 I'm Jashley Rain Flores, a 3rd-year student at Pampanga State University. Ask me anything!",
            time: new Date().toLocaleTimeString(),
          },
        ];
  });
  const [input, setInput] = useState("");
  const chatEndRef = useRef(null);

  // Scroll smoothly to bottom and save messages
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
    localStorage.setItem("chatMessages", JSON.stringify(messages));
  }, [messages]);

  // Send message
  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMsg = {
      sender: "user",
      text: input.slice(0, 500),
      time: new Date().toLocaleTimeString(),
    };

    // Add user message and bot typing indicator
    setMessages((prev) => [...prev, userMsg, { sender: "bot", text: "typing", typing: true }]);
    setInput("");

    try {
      const res = await fetch("https://new-portfolio-backend-1-b74x.onrender.com/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
       body: JSON.stringify({ message: input }),
    });

      const data = await res.json();

      await new Promise((resolve) => setTimeout(resolve, 1000 + Math.random() * 1000));

      setMessages((prev) =>
        prev.map((msg) =>
          msg.typing
            ? { sender: "bot", text: data.reply, time: new Date().toLocaleTimeString() }
            : msg
        )
      );
    } catch {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.typing
            ? { sender: "bot", text: "Server not responding 😢", time: new Date().toLocaleTimeString() }
            : msg
        )
      );
    }
  };

  // Keyboard shortcuts: Enter sends, Escape closes
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // prevent newline in textarea
      sendMessage();
    }
    if (e.key === "Escape") setIsOpen(false);
  };

  return (
    <>
      {/* Floating Button */}
      <button className={`chatbot-fab ${darkMode ? "dark" : ""}`} onClick={() => setIsOpen(true)}>
        💬
      </button>

      {/* Overlay */}
      {isOpen && (
        <div className="chat-overlay">
          <div className={`chatbot-box ${darkMode ? "dark" : ""}`}>
            {/* Header */}
            <div className="chat-header">
              <div className="bot-profile">
                <img src={reynImg} alt="Reyn" className="bot-img" />
                <div className="bot-info">
                  <span>Chat with Reyn</span>
                  <span className="online-circle"></span>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)}>✖</button>
            </div>

            {/* Messages */}
            <div className="chat-area">
              {messages.map((msg, i) => (
                <div key={i} className={`msg-wrapper ${msg.sender}`}>
                  {msg.sender === "bot" && <img src={reynImg} alt="Reyn" className="msg-img" />}
                  <div className={`msg ${msg.sender}`}>
                    {msg.typing ? (
                      <div className="typing">
                        <span className="typing-dot"></span>
                        <span className="typing-dot"></span>
                        <span className="typing-dot"></span>
                      </div>
                    ) : (
                      <>
                        {msg.text}
                        <div className="timestamp">{msg.time}</div>
                      </>
                    )}
                  </div>
                </div>
              ))}
              <div ref={chatEndRef}></div>
            </div>

            {/* Input */}
            <div className="input-area">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                rows={2}
                onKeyDown={handleKeyDown}
              />
              <button onClick={sendMessage}>➤</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Chatbot;
