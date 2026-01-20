import { FaBriefcase, FaCalendarAlt } from "react-icons/fa";
import "./Experience.css";

export default function Experience({ darkMode }) {
  return (
    <div className={`experience-card ${darkMode ? "dark" : ""}`}>
      <div className="experience-header">
        <FaBriefcase className="experience-icon" />
        <h3>Experience</h3>
      </div>

      <div className="timeline">
        <div className="timeline-item">
          <div className="timeline-dot" />
          <div className="timeline-content">
            <div className="timeline-top">
              <FaCalendarAlt className="timeline-icon" />
              <span className="timeline-year">2026</span>
            </div>
            <h4>BS INFORMATION TECHNOLOGY - 3rd year</h4>
            <p>Pampanga State University</p>
          </div>
        </div>

        <div className="timeline-item">
          <div className="timeline-dot" />
          <div className="timeline-content">
            <div className="timeline-top">
              <FaCalendarAlt className="timeline-icon" />
              <span className="timeline-year">2025</span>
            </div>
            <h4>Backend Projects</h4>
            <p>Mini Node.js & Database Projects</p>
          </div>
        </div>

        <div className="timeline-item">
          <div className="timeline-dot" />
          <div className="timeline-content">
            <div className="timeline-top">
              <FaCalendarAlt className="timeline-icon" />
              <span className="timeline-year">2024</span>
            </div>
            <h4>Front-End Projects</h4>
            <p>School and personal projects using HTML,CSS,JS </p>
          </div>
        </div>

        <div className="timeline-item">
          <div className="timeline-dot" />
          <div className="timeline-content">
            <div className="timeline-top">
              <FaCalendarAlt className="timeline-icon" />
              <span className="timeline-year">2023</span>
            </div>
            <h4>Started Learning Programming</h4>
            <p>Hello World! - First line of code</p>
          </div>
        </div>
      </div>
    </div>
  );
}
