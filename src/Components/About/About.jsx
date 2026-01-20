import { FaUserAlt, FaTools } from "react-icons/fa";
import "./About.css";

export default function About({ darkMode }) {
  return (
    <div className={`about-card ${darkMode ? "dark" : ""}`}>

      {/* ABOUT HEADER */}
      <div className="about-header">
        <FaUserAlt className="about-icon" />
        <h3>About Me</h3>
      </div>

      <p className="about-text">
        Aspiring Web Developer and 3rd-year college student at Pampanga State
        University, passionate about building clean and user-friendly web
        applications. I continuously develop my skills through projects and
        hands-on practice, aiming to gain industry experience and contribute to meaningful solutions.
      </p>

      {/* KEY EXPERTISE HEADER */}
      <div className="expertise-header">
        <FaTools className="expertise-icon" />
        <h4>Key Expertise</h4>
      </div>

      <div className="tags">
        <span>React</span>
        <span>UI/UX Design</span>
        <span>TypeScript</span>
        <span>Frontend Development</span>
        <span>Responsive Web Design</span>
      </div>

    </div>
  );
}
