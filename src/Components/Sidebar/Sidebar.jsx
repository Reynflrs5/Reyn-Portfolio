import { useState } from "react";
import "./Sidebar.css";
import {
  FaMapMarkerAlt,
  FaCheckCircle,
  FaEnvelope,
  FaLinkedin,
  FaMoon,
  FaSun,
  FaListAlt,
  FaGithub,
  FaFacebook,
  FaInstagram,
  FaPhone,
  FaLink,
  FaCommentDots,
  FaTimes,
} from "react-icons/fa";
import reynimg from "../../assets/reynimg.png";

export default function Sidebar({ darkMode, setDarkMode }) {
  const [resumeModal, setResumeModal] = useState(false);

  const handleLinkedInClick = () => {
    window.open(
      "https://www.linkedin.com/in/jashley-rain-flores-2734323a7/",
      "_blank"
    );
  };

  const handleGitHubClick = () => {
    window.open("https://github.com/Reynflrs5", "_blank");
  };

  const handleFacebookClick = () => {
    window.open("https://facebook.com/Reyn12345", "_blank");
  };

  const handleInstagramClick = () => {
    window.open("https://instagram.com/reynflrs", "_blank");
  };

  const handleSendEmail = () => {
    window.location.href =
      "mailto:fjashleyrain@gmail.com?subject=Portfolio Inquiry&body=Hello Jashley,";
  };

  return (
    <aside className={`sidebar ${darkMode ? "dark" : ""}`}>
      {/* PROFILE WRAPPER */}
      <div className="profile-wrapper">
        <img src={reynimg} alt="Reyn profile" className="profile-img" />
        <button
          className="dark-mode-btn"
          onClick={() => setDarkMode(!darkMode)}
          aria-label="Toggle dark mode"
        >
          {darkMode ? <FaSun /> : <FaMoon />}
        </button>
      </div>

      {/* BANNER */}
      <div className="sidebar-banner"></div>

      {/* SIDEBAR CONTENT */}
      <div className="sidebar-content">
        <h2 className="sidebar-name">
          Jashley Rain Flores <FaCheckCircle className="verified" />
        </h2>

        <p className="location centered">
          <FaMapMarkerAlt /> Pampanga, Philippines
        </p>

        <button className="btn-primary" onClick={handleSendEmail}>
          <FaEnvelope /> Send Email
        </button>

        <div className="btn-row">
          <button
            className="btn-secondary"
            onClick={() => setResumeModal(true)}
          >
            View Resume
          </button>

          <button className="btn-secondary" onClick={handleLinkedInClick}>
            <FaLinkedin /> LinkedIn
          </button>
        </div>

        {/* SUMMARY */}
        <div className="summary-header">
          <h3>
            <FaListAlt className="summary-icon" />
            Summary
          </h3>
        </div>

        <div className="summary">
          <div className="summary-item">
            <h3>3rd</h3>
            <span>Year Student</span>
          </div>
          <div className="summary-item">
            <h3>4</h3>
            <span>Projects</span>
          </div>
          <div className="summary-item">
            <h3>15</h3>
            <span>Tech</span>
          </div>
        </div>

        <p className="status">Open to work</p>

        <div className="sidebar-extra">
          <div className="extra-section">
            <h3>
              <FaListAlt className="extra-icon" /> My Goal
            </h3>
            <p>
              Become a Full Stack Web Developer, build scalable web applications,
              and contribute to innovative tech projects that solve real-world
              problems.
            </p>
          </div>

          <div className="extra-section">
            <h3>
              <FaLink className="extra-icon" /> Connect With Me
            </h3>
            <ul className="social-links">
              <li onClick={handleGitHubClick}>
                <FaGithub /> GitHub
              </li>
              <li onClick={handleFacebookClick}>
                <FaFacebook /> Facebook
              </li>
              <li onClick={handleInstagramClick}>
                <FaInstagram /> Instagram
              </li>
            </ul>
          </div>

          <div className="extra-section">
            <h3>
              <FaCommentDots className="extra-icon" /> Contact Me
            </h3>
            <ul className="contact-info">
              <li>
                <FaEnvelope /> fjashleyrain@gmail.com
              </li>
              <li>
                <FaPhone /> +63 936 826 9722
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* ========== RESUME MODAL ========== */}
      {resumeModal && (
        <div
          className="modal-overlay"
          onClick={() => setResumeModal(false)}
        >
          <div
            className={`modal-content ${darkMode ? "dark" : ""}`}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="modal-close"
              onClick={() => setResumeModal(false)}
            >
              <FaTimes />
            </button>

            <div className="modal-badge">🚀 Coming Soon</div>

            <h3 className="modal-title">Resume</h3>
            <p className="modal-text">
              My resume is currently being updated with my latest projects and skills.
              It will be available for download soon.
            </p>

            <div className="modal-actions">
              <a
                href="/resume.pdf"
                download="Jashley_Rain_Flores_Resume.pdf"
                className="btn-download"
              >
                Download Resume
              </a>

              <button
                className="btn-primary"
                onClick={() => setResumeModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}
