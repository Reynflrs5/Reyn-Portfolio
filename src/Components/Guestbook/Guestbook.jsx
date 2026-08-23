import { useRef, useState, useEffect } from "react";
import { FiMessageSquare, FiSend, FiUser, FiBriefcase, FiStar, FiCheck, FiAlertCircle, FiArrowRight } from "react-icons/fi";
import "./Guestbook.css";

const initials = (name = "") =>
  name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase() || "?";

const VOUCH_SUGGESTIONS = [
  "Nice work! 🔥",
  "Great portfolio!",
  "Thanks for helping on my project!",
  "Very talented developer!",
  "Clean code and great design!",
];

const ROLE_OPTIONS = [
  "Classmate",
  "Client",
  "Teammate",
  "Developer",
  "Professor",
  "Friend",
  "Others",
];

export default function Guestbook({ onViewAll }) {
  const [entries, setEntries] = useState([]);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [customRole, setCustomRole] = useState("");
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [justPosted, setJustPosted] = useState(false);
  const scrollerRef = useRef(null);

  const fetchEntries = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/guestbook");
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setEntries(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) {
      setError("Please fill out Name and Message.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("http://localhost:5000/api/guestbook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, role: role === "Others" ? customRole || "Others" : role, message, rating })
      });

      if (!res.ok) throw new Error("Failed to post message");

      const newEntry = await res.json();
      setEntries([newEntry, ...entries]);
      setName("");
      setRole("");
      setCustomRole("");
      setRating(5);
      setMessage("");
      setJustPosted(true);
      setTimeout(() => setJustPosted(false), 2200);
      requestAnimationFrame(() => {
        scrollerRef.current?.scrollTo({ left: 0, behavior: "smooth" });
      });
    } catch (err) {
      setError("Failed to post message. Make sure the backend is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="guestbook-section">
      <div className="gb-header">
        <div className="gb-header-top">
          <h2 className="gb-title">06 — recommendations</h2>
          <button className="gb-all-btn" onClick={onViewAll}>
            ALL RECOMMENDATIONS <FiArrowRight />
          </button>
        </div>
        <p className="gb-subtitle">Client and peer vouches.</p>
      </div>

      <div className="gb-container">

        {/* Vouches List */}
        <div className="gb-entries-wrapper">
          {entries.length === 0 ? (
            <div className="gb-empty">
              <FiMessageSquare className="gb-empty-icon" />
              <p>Be the first to vouch for me!</p>
            </div>
          ) : (
            <>
              <div className="gb-entries" ref={scrollerRef}>
                {entries.slice(0, 5).map((entry, i) => (
                  <div
                    key={entry.id}
                    className="gb-card"
                    style={{ animationDelay: `${Math.min(i, 6) * 60}ms` }}
                  >
                    <span className="gb-card-quote" aria-hidden="true">&ldquo;</span>
                    <div className="gb-card-stars">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <FiStar key={star} fill={star <= (entry.rating || 5) ? "currentColor" : "none"} color={star <= (entry.rating || 5) ? "currentColor" : "#333"} />
                      ))}
                    </div>
                    <p className="gb-card-message">{entry.message}</p>
                    <div className="gb-card-footer">
                      <span className="gb-card-avatar">{initials(entry.name)}</span>
                      <div className="gb-card-identity">
                        <span className="gb-card-name">{entry.name}</span>
                        <span className="gb-card-role">{entry.role || "Client / Peer"}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="gb-entries-fade" aria-hidden="true" />
            </>
          )}
        </div>

        {/* Add Vouch Form */}
        <div className="gb-form-wrapper">
          <h3 className="gb-form-title">Leave a Vouch</h3>
          <form className="gb-form" onSubmit={handleSubmit} noValidate>
            {error && (
              <div className="gb-error" role="alert">
                <FiAlertCircle />
                <span>{error}</span>
              </div>
            )}

            <div className="gb-rating-input">
              <span className="gb-rating-label">Rate your experience:</span>
              <div className="gb-rating-stars">
                {[1, 2, 3, 4, 5].map((star) => (
                  <FiStar
                    key={star}
                    size={22}
                    className={`gb-star-btn ${(hoverRating || rating) >= star ? "active" : ""}`}
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    fill={(hoverRating || rating) >= star ? "currentColor" : "none"}
                  />
                ))}
              </div>
            </div>

            <div className="gb-input-row">
              <label className="gb-input-group">
                <FiUser className="gb-icon" />
                <input
                  type="text"
                  placeholder=" "
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  maxLength={50}
                />
                <span className="gb-label">Your Name</span>
              </label>
              <label className="gb-input-group">
                <FiBriefcase className="gb-icon" />
                <select
                  value={role}
                  onChange={(e) => { setRole(e.target.value); setCustomRole(""); }}
                  className="gb-select"
                >
                  <option value="" disabled>Your Role</option>
                  {ROLE_OPTIONS.map((r) => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                </select>
              </label>
              {role === "Others" && (
                <label className="gb-input-group">
                  <FiBriefcase className="gb-icon" />
                  <input
                    type="text"
                    placeholder=" "
                    value={customRole}
                    onChange={(e) => setCustomRole(e.target.value)}
                    maxLength={50}
                  />
                  <span className="gb-label">Specify your role...</span>
                </label>
              )}
            </div>

            <label className="gb-input-group gb-textarea-group">
              <FiMessageSquare className="gb-icon top-icon" />
              <textarea
                placeholder=" "
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                maxLength={250}
                rows={3}
              />
              <span className="gb-label">Write your recommendation here...</span>
              <span className="gb-char-count">{message.length}/250</span>
            </label>

            {/* Suggestion chips */}
            <div className="gb-suggestions">
              {VOUCH_SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  type="button"
                  className={`gb-suggestion-chip${message === s ? " active" : ""}`}
                  onClick={() => setMessage(s)}
                >
                  {s}
                </button>
              ))}
            </div>

            <button type="submit" className={`gb-submit-btn${justPosted ? " is-success" : ""}`} disabled={loading}>
              {justPosted ? (
                <>Posted <FiCheck /></>
              ) : loading ? (
                "Submitting..."
              ) : (
                <>Submit Vouch <FiSend /></>
              )}
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}