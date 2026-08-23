import { useState, useEffect, useRef } from "react";
import "./Sidebar.css";
import {
  FiGithub, FiX, FiFileText, FiArrowUpRight
} from "react-icons/fi";

const BACKEND = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";

export default function Sidebar({ isMobileMenuOpen, setIsMobileMenuOpen }) {
  const [activeTab, setActiveTab] = useState("Projects");
  const [activeVisitors, setActiveVisitors] = useState(0);
  const navRefs = useRef({});
  const [pillStyle, setPillStyle] = useState({ top: 0, height: 0, opacity: 0 });
  const [time, setTime] = useState(new Date());

  // Clock effect
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Track real active visitors via backend
  useEffect(() => {
    // Generate a unique session ID for this browser tab
    const sessionId = Math.random().toString(36).substring(2, 15);

    const pingBackend = async () => {
      try {
        const res = await fetch(`${BACKEND}/api/ping`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sessionId })
        });
        const data = await res.json();
        if (data.activeVisitors !== undefined) {
          setActiveVisitors(data.activeVisitors);
        }
      } catch (err) {
        console.error("Failed to ping visitors:", err);
      }
    };

    // Ping immediately, then every 10 seconds
    pingBackend();
    const interval = setInterval(pingBackend, 10000);

    return () => clearInterval(interval);
  }, []);

  const mainLinks = [
    { name: "Projects", id: "section-projects" },
    { name: "Experience", id: "section-experience" },
    { name: "Stack", id: "section-stack" },
    { name: "Certifications", id: "section-certifications" },
  ];

  // Track active section on scroll
  useEffect(() => {
    const map = {
      "section-about": "About",
      "section-projects": "Projects",
      "section-experience": "Experience",
      "section-stack": "Stack",
      "section-certifications": "Certifications",
    };

    const observers = [];
    Object.keys(map).forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveTab(map[id]); },
        { threshold: 0.3 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  // Move the sliding pill to sit behind the active nav item
  useEffect(() => {
    const el = navRefs.current[activeTab];
    if (el) {
      setPillStyle({ top: el.offsetTop, height: el.offsetHeight, opacity: 1 });
    }
  }, [activeTab]);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          className="sb-mobile-overlay"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      <aside className={`new-sidebar ${isMobileMenuOpen ? "mobile-open" : ""}`}>
        {/* Top Header — name scrolls to About */}
          <div className="sb-header">
            <div
              className="sb-title-wrap sb-title-link"
              onClick={() => {
                scrollTo("section-about");
                setIsMobileMenuOpen(false);
              }}
              title="Back to top"
            >
              <span className="sb-mark">JR</span>
              <div className="sb-title-block">
                <h1 className="sb-title">Jashley Rain</h1>
                <span className="sb-subtitle">
                  <span className="sb-dot-available" />
                  Available for work
                </span>
              </div>
            </div>
            <button className="sb-close-btn" onClick={() => setIsMobileMenuOpen(false)}>
              <FiX size={20} />
            </button>
          </div>

          {/* Nav Links */}
          <nav className="sb-nav-section sb-nav-list">
            <div
              className="sb-nav-pill"
              style={{ top: pillStyle.top, height: pillStyle.height, opacity: pillStyle.opacity }}
            />
            {mainLinks.map((link) => (
              <button
                key={link.name}
                ref={(node) => { navRefs.current[link.name] = node; }}
                className={`sb-nav-item ${activeTab === link.name ? "active" : ""}`}
                onClick={() => {
                  setActiveTab(link.name);
                  scrollTo(link.id);
                  setIsMobileMenuOpen(false);
                }}
              >
                <span>{link.name}</span>
                {activeTab === link.name && <FiArrowUpRight className="sb-nav-arrow" size={13} />}
              </button>
            ))}
          </nav>

          {/* Mini Activity Chart */}
          <div className="sb-activity-wrapper">
            <span className="sb-activity-label">Activity</span>
            <div className="sb-activity-graph">
              {[0, 2, 1, 3, 0, 4, 1, 2, 0, 3, 4, 1].map((level, i) => (
                <div key={i} className={`sb-activity-square level-${level}`} />
              ))}
            </div>
          </div>

          {/* GitHub & Resume Buttons */}
          <div className="sb-links-row">
            <a
              href="https://github.com/Reynflrs5"
              target="_blank"
              rel="noreferrer"
              className="sb-chip"
            >
              <FiGithub size={14} />
              <span>GitHub</span>
            </a>
            <button className="sb-chip sb-chip-disabled" disabled>
              <FiFileText size={14} />
              <span>Resume</span>
            </button>
          </div>

          {/* Visitors */}
          <div className="sb-community">
            <div className="sb-community-top">
              <span className="sb-live-badge">
                <span className="sb-pulse-dot" />
                Live
              </span>
              <span className="sb-viewing-count">
                {activeVisitors} {activeVisitors === 1 ? "person" : "people"} here
              </span>
            </div>
            <div className="sb-avatars">
              <div className="sb-avatar-stack">
                {activeVisitors >= 1 && <img src="https://i.pravatar.cc/150?u=v1" alt="viewer" className="sb-mini-avatar" style={{ zIndex: 3 }} />}
                {activeVisitors >= 2 && <img src="https://i.pravatar.cc/150?u=v2" alt="viewer" className="sb-mini-avatar" style={{ zIndex: 2 }} />}
                {activeVisitors >= 3 && <img src="https://i.pravatar.cc/150?u=v3" alt="viewer" className="sb-mini-avatar" style={{ zIndex: 1 }} />}
                {activeVisitors === 0 && <div className="sb-mini-avatar sb-mini-avatar-empty" />}
              </div>
              {activeVisitors > 3 && (
                <span className="sb-avatar-count">+{activeVisitors - 3}</span>
              )}
            </div>
          </div>

          {/* Location & Time Widget */}
          <div className="sb-location-widget">
            <div className="sb-location-dot"></div>
            <div className="sb-location-text">
              <span>Manila, PH</span>
              <span className="sb-time">
                {time.toLocaleTimeString("en-US", {
                  timeZone: "Asia/Manila",
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                })}
              </span>
            </div>
          </div>

          {/* Bottom Actions */}
          <div className="sb-footer">
            <div className="sb-contact-card">
              <p className="sb-contact-label">For work, collabs & everything else</p>
              <a href="mailto:fjashleyrain@gmail.com" className="sb-email-link">
                <span>fjashleyrain@gmail.com</span>
                <FiArrowUpRight size={14} />
              </a>
            </div>
        </div>
      </aside>
    </>
  );
}