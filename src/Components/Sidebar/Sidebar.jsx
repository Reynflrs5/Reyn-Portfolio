import { useState } from "react";
import "./Sidebar.css";
import {
  FiMoon, FiSun, FiMail, FiMapPin, FiCheckCircle,
  FiGithub, FiLinkedin, FiFacebook, FiInstagram,
  FiPhone, FiLink, FiTarget, FiMessageCircle,
  FiBarChart2, FiFileText, FiDownload, FiX
} from "react-icons/fi";
import reynimg from "../../assets/reynimg.png";

export default function Sidebar({ darkMode, setDarkMode }) {
  const [resumeModal, setResumeModal] = useState(false);

  const links = {
    linkedin: "https://www.linkedin.com/in/jashley-rain-flores-2734323a7/",
    github: "https://github.com/Reynflrs5",
    facebook: "https://facebook.com/Reyn12345",
    instagram: "https://instagram.com/reynflrs",
    email: "mailto:fjashleyrain@gmail.com?subject=Portfolio Inquiry&body=Hello Jashley,",
  };

  const open = (url) => window.open(url, "_blank");

  return (
    <aside className={`sb ${darkMode ? "dark" : ""}`}>
      {/* Banner */}
      <div className="sb-banner">
        <div className="sb-banner-pattern" />
        <button
          className="sb-darkbtn"
          onClick={() => setDarkMode(!darkMode)}
          aria-label="Toggle dark mode"
        >
          {darkMode ? <FiSun size={13} /> : <FiMoon size={13} />}
        </button>
      </div>

      {/* Avatar */}
      <div className="sb-profile-row">
        <div className="sb-avatar">
          <img src={reynimg} alt="Jashley Rain Flores" />
        </div>
      </div>

      <div className="sb-body">
        {/* Name & location */}
        <p className="sb-name">
          Jashley Rain Flores
          <FiCheckCircle className="sb-verified" size={13} />
        </p>
        <p className="sb-loc">
          <FiMapPin size={12} />
          Pampanga, Philippines
        </p>

        {/* Actions */}
        <button className="sb-btn-primary" onClick={() => window.location.href = links.email}>
          <FiMail size={13} /> Send email
        </button>
        <div className="sb-btn-row">
          <button className="sb-btn-sec" onClick={() => setResumeModal(true)}>
            <FiFileText size={12} /> Resume
          </button>
          <button className="sb-btn-sec" onClick={() => open(links.linkedin)}>
            <FiLinkedin size={12} /> LinkedIn
          </button>
        </div>

        <hr className="sb-divider" />

        {/* Stats */}
        <p className="sb-section-label">
          <FiBarChart2 size={12} /> Overview
        </p>
        <div className="sb-stats">
          <div className="sb-stat">
            <span className="sb-stat-num">3rd</span>
            <span className="sb-stat-lbl">year</span>
          </div>
          <div className="sb-stat">
            <span className="sb-stat-num">4</span>
            <span className="sb-stat-lbl">projects</span>
          </div>
          <div className="sb-stat">
            <span className="sb-stat-num">15</span>
            <span className="sb-stat-lbl">techs</span>
          </div>
        </div>
        <div style={{ marginBottom: "12px", textAlign: "center" }}>
          <span className="sb-status">
            <span className="sb-status-dot" />
            Open to work
          </span>
        </div>

        <hr className="sb-divider" />

        {/* Goal */}
        <div className="sb-section">
          <p className="sb-section-head">
            <FiTarget size={13} className="sb-section-icon purple" /> My goal
          </p>
          <p className="sb-section-body">
            Become a Full Stack Web Developer, build scalable web applications,
            and contribute to innovative tech projects that solve real-world problems.
          </p>
        </div>

        {/* Social */}
        <div className="sb-section">
          <p className="sb-section-head">
            <FiLink size={13} className="sb-section-icon teal" /> Connect
          </p>
          <ul className="sb-links">
            <li className="sb-link-item" onClick={() => open(links.github)}>
              <FiGithub size={14} /> GitHub
            </li>
            <li className="sb-link-item" onClick={() => open(links.facebook)}>
              <FiFacebook size={14} /> Facebook
            </li>
            <li className="sb-link-item" onClick={() => open(links.instagram)}>
              <FiInstagram size={14} /> Instagram
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div className="sb-section">
          <p className="sb-section-head">
            <FiMessageCircle size={13} className="sb-section-icon blue" /> Contact
          </p>
          <ul className="sb-links">
            <li className="sb-link-item">
              <FiMail size={14} /> fjashleyrain@gmail.com
            </li>
            <li className="sb-link-item">
              <FiPhone size={14} /> +63 936 826 9722
            </li>
          </ul>
        </div>
      </div>

      {/* Resume Modal */}
      {resumeModal && (
        <div className="sb-overlay" onClick={() => setResumeModal(false)}>
          <div
            className={`sb-modal ${darkMode ? "dark" : ""}`}
            onClick={(e) => e.stopPropagation()}
          >
            <button className="sb-modal-close" onClick={() => setResumeModal(false)}>
              <FiX size={12} />
            </button>
            <span className="sb-modal-badge">🚀 coming soon</span>
            <p className="sb-modal-title">Resume</p>
            <p className="sb-modal-text">
              My resume is being updated with the latest projects and skills.
              It will be available for download soon.
            </p>
            <div className="sb-modal-actions">
              <a
                href="/resume.pdf"
                download="Jashley_Rain_Flores_Resume.pdf"
                className="sb-btn-dl"
              >
                <FiDownload size={13} /> Download resume
              </a>
              <button className="sb-btn-sec sb-btn-full" onClick={() => setResumeModal(false)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}