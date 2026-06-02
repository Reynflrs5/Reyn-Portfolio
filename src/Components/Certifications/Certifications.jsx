import { useState } from "react";
import { FiX, FiAward, FiArrowRight } from "react-icons/fi";
import doc1 from "../../assets/doc1.png";
import "./Certifications.css";

const certificationsData = [
  {
    title: "OS Installation and Troubleshooting",
    subtitle: "Best Group in Computer System Servicing",
    badge: "Recognition award",
    image: doc1,
  },
  // Add more certificates here as needed
];

export default function Certifications({ darkMode }) {
  const [current, setCurrent] = useState(null);

  return (
    <div className={`cf-card ${darkMode ? "dark" : ""}`}>
      {/* Header */}
      <div className="cf-header">
        <div className="cf-header-left">
          <div className="cf-icon-wrap">
            <FiAward size={14} />
          </div>
          <h3 className="cf-title">Certifications</h3>
        </div>
        <span className="cf-count">
          {certificationsData.length} certificate{certificationsData.length !== 1 ? "s" : ""}
        </span>
      </div>

      {/* List */}
      <div className="cf-list">
        {certificationsData.map((cert, i) => (
          <div
            key={i}
            className="cf-item"
            onClick={() => setCurrent(cert)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && setCurrent(cert)}
          >
            <div className="cf-medal">
              <FiAward size={15} color="#BA7517" />
            </div>
            <div className="cf-body">
              <p className="cf-name">{cert.title}</p>
              <p className="cf-sub">{cert.subtitle}</p>
            </div>
            <FiArrowRight className="cf-arrow" size={14} />
          </div>
        ))}
      </div>

      {/* Modal */}
      {current && (
        <div
          className="cf-overlay"
          onClick={() => setCurrent(null)}
        >
          <div
            className="cf-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="cf-modal-close"
              onClick={() => setCurrent(null)}
              aria-label="Close"
            >
              <FiX size={13} />
            </button>

            <div className="cf-img-wrap">
              <img src={current.image} alt={current.title} />
            </div>

            <p className="cf-modal-name">{current.title}</p>
            <p className="cf-modal-sub">{current.subtitle}</p>

            {current.badge && (
              <span className="cf-modal-badge">
                <FiAward size={12} />
                {current.badge}
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}