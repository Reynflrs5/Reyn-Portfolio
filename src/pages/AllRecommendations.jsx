import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiArrowLeft, FiStar, FiMessageSquare } from "react-icons/fi";
import "./AllRecommendations.css";

const BACKEND = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";

const initials = (name = "") =>
  name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase() || "?";

export default function AllRecommendations({ onBack }) {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const res = await fetch(`${BACKEND}/api/guestbook`);
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setEntries(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchEntries();
  }, []);

  return (
    <div className="all-recommendations-page">
      <div className="ar-header">
        <button className="ar-back-btn" onClick={onBack}>
          <FiArrowLeft size={16} />
          <span>Back to Profile</span>
        </button>
        <h1 className="ar-title">All Recommendations</h1>
      </div>

      <div className="ar-list">
        {loading ? (
          <div className="ar-loading">Loading recommendations...</div>
        ) : entries.length === 0 ? (
          <div className="ar-empty">
            <FiMessageSquare size={40} className="ar-empty-icon" />
            <p>No recommendations yet.</p>
          </div>
        ) : (
          entries.map((entry, i) => (
            <motion.div
              key={entry.id}
              className="ar-item"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <div className="ar-left">
                <span className="ar-name">{entry.name}</span>
                <span className="ar-role">{entry.role || "Client / Peer"}</span>
              </div>
              <div className="ar-right">
                <div className="ar-stars">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <FiStar
                      key={star}
                      size={14}
                      fill={star <= (entry.rating || 5) ? "currentColor" : "none"}
                      color={star <= (entry.rating || 5) ? "currentColor" : "#333"}
                    />
                  ))}
                </div>
                <p className="ar-desc">"{entry.message}"</p>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
