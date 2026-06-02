import { FiBriefcase } from "react-icons/fi";
import "./Experience.css";

const entries = [
  {
    year: "2026",
    title: "BS Information Technology — 3rd year",
    sub: "Pampanga State University",
    badge: "current",
    accent: "#7F77DD",
  },
  {
    year: "2025",
    title: "Back-end projects",
    sub: "Mini Node.js & database projects",
    badge: "back-end",
    accent: "#1D9E75",
  },
  {
    year: "2024",
    title: "Front-end projects",
    sub: "School & personal work with HTML, CSS, JS",
    badge: "front-end",
    accent: "#378ADD",
  },
  {
    year: "2023",
    title: "Started learning programming",
    sub: "Hello World — first line of code",
    badge: "origin",
    accent: "#BA7517",
  },
];

const BADGE_CLASS = {
  current: "tl-badge badge-current",
  "back-end": "tl-badge badge-dev",
  "front-end": "tl-badge badge-edu",
  origin: "tl-badge badge-start",
};

export default function Experience({ darkMode }) {
  return (
    <div className={`ec-card ${darkMode ? "dark" : ""}`}>
      {/* Header */}
      <div className="ec-header">
        <div className="ec-header-left">
          <div className="ec-icon-wrap">
            <FiBriefcase size={14} />
          </div>
          <h3 className="ec-title">Experience</h3>
        </div>
        <span className="ec-count">{entries.length} milestones</span>
      </div>

      {/* Timeline */}
      <div className="tl">
        {entries.map((e) => (
          <div
            key={e.year}
            className={`tl-item ${e.badge === "current" ? "current" : ""}`}
            style={{ "--accent": e.accent }}
          >
            <div className="tl-dot" />
            <div className="tl-top">
              <span className="tl-year">{e.year}</span>
              <span className={BADGE_CLASS[e.badge]}>{e.badge}</span>
            </div>
            <p className="tl-title">{e.title}</p>
            <p className="tl-sub">{e.sub}</p>
          </div>
        ))}
      </div>
    </div>
  );
}