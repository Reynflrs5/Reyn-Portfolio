import { FiUser, FiZap } from "react-icons/fi";
import "./About.css";

export default function About({ darkMode }) {
  return (
    <div className={`ab-card ${darkMode ? "dark" : ""}`}>
      {/* Header */}
      <div className="ab-header">
        <div className="ab-header-left">
          <div className="ab-icon-wrap">
            <FiUser size={15} />
          </div>
          <h3 className="ab-title">About me</h3>
        </div>
        <span className="ab-badge">intro</span>
      </div>

      <p className="ab-text">
        Aspiring Web Developer and 3rd-year college student at Pampanga State
        University, passionate about building clean and user-friendly web
        applications. I continuously develop my skills through projects and
        hands-on practice, aiming to gain industry experience and contribute to meaningful solutions.
      </p>

      <hr className="ab-divider" />

      {/* Key Expertise */}
      <div className="ab-section-header">
        <FiZap size={13} className="ab-section-icon" />
        <span className="ab-section-title">Key Expertise</span>
      </div>

      <div className="ab-tags">
        <span className="ab-tag">React</span>
        <span className="ab-tag">UI/UX Design</span>
        <span className="ab-tag">TypeScript</span>
        <span className="ab-tag">Frontend Development</span>
        <span className="ab-tag">Responsive Web Design</span>
      </div>
    </div>
  );
}
