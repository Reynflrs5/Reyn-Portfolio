import { useState } from "react";
import "./Sidebar.css";
import {
  FiMoon, FiSun, FiMail, FiMapPin,
  FiGithub, FiFacebook, FiInstagram,
  FiPhone, FiTarget,
  FiFileText, FiDownload, FiX,
  FiArrowRight, FiShare2
} from "react-icons/fi";
import reynimg from "../../assets/reynimg.png";

export default function Sidebar({ darkMode, setDarkMode }) {
  const [resumeModal, setResumeModal] = useState(false);

  const links = {
    github: "https://github.com/Reynflrs5",
    facebook: "https://facebook.com/Reyn12345",
    instagram: "https://instagram.com/reynflrs",
    email: "mailto:fjashleyrain@gmail.com?subject=Freelance Inquiry&body=Hi Jashley,",
  };

  const open = (url) => window.open(url, "_blank");

  return (
    <aside className={`sb ${darkMode ? "dark" : ""}`}>

      {/* Banner */}
      <div className="sb-banner">
        <div className="sb-banner-grid" />
        <div className="sb-banner-glow" />
        <button
          className="sb-darkbtn"
          onClick={() => setDarkMode(!darkMode)}
          aria-label="Toggle dark mode"
        >
          {darkMode ? <FiSun size={13} /> : <FiMoon size={13} />}
        </button>
      </div>

      {/* Avatar */}
      <div className="sb-avatar-wrap">
        <div className="sb-avatar">
          <img src={reynimg} alt="Jashley Rain Flores" />
        </div>
      </div>

      <div className="sb-body">

        {/* Name & location */}
        <p className="sb-name">Jashley Rain Flores</p>
        <p className="sb-loc">
          <FiMapPin size={12} />
          Pampanga, Philippines
        </p>

        {/* Availability */}
        <div className="sb-avail">
          <div className="sb-avail-dot-wrap">
            <div className="sb-avail-dot-ring" />
            <div className="sb-avail-dot" />
          </div>
          <div className="sb-avail-text">
            <p className="sb-avail-title">Available for freelance</p>
            <p className="sb-avail-sub">Open to projects &amp; collaborations</p>
          </div>
          <FiArrowRight size={13} className="sb-avail-arrow" />
        </div>

        {/* Primary CTA */}
        <button
          className="sb-btn-hire"
          onClick={() => (window.location.href = links.email)}
        >
          <FiMail size={14} />
          Hire me
        </button>

        {/* Secondary actions */}
        <div className="sb-btn-row">
          <button className="sb-btn-sec" onClick={() => setResumeModal(true)}>
            <FiFileText size={12} />
            Resume
          </button>
          <button className="sb-btn-sec" onClick={() => open(links.github)}>
            <FiGithub size={12} />
            GitHub
          </button>
        </div>

        <hr className="sb-divider" />

        {/* Stats */}
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

        {/* Goal */}
        <div className="sb-section">
          <p className="sb-section-head">
            <FiTarget size={12} className="sb-section-icon teal" />
            Goal
          </p>
          <p className="sb-section-body">
            Become a Full Stack Developer, build scalable web apps, and
            contribute to tech projects that solve real-world problems.
          </p>
        </div>

        <hr className="sb-divider" />

        <hr className="sb-divider" />

        {/* Connect & Contact */}
        <div className="sb-section">
          <p className="sb-section-head">
            <FiShare2 size={12} className="sb-section-icon blue" />
            Connect
          </p>
          <ul className="sb-links">
            <li className="sb-link-item" onClick={() => open(links.github)}>
              <span className="sb-link-icon gh">
                <FiGithub size={13} />
              </span>
              GitHub
            </li>
            <li className="sb-link-item" onClick={() => open(links.facebook)}>
              <span className="sb-link-icon fb">
                <FiFacebook size={13} />
              </span>
              Facebook
            </li>
            <li className="sb-link-item" onClick={() => open(links.instagram)}>
              <span className="sb-link-icon ig">
                <FiInstagram size={13} />
              </span>
              Instagram
            </li>
            <li className="sb-link-item sb-link-static">
              <span className="sb-link-icon em">
                <FiMail size={13} />
              </span>
              fjashleyrain@gmail.com
            </li>
            <li className="sb-link-item sb-link-static">
              <span className="sb-link-icon ph">
                <FiPhone size={13} />
              </span>
              +63 936 826 9722
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
                <FiDownload size={13} />
                Download resume
              </a>
              <button
                className="sb-btn-sec sb-btn-full"
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