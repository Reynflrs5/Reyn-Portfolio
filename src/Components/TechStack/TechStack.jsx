import { useState } from "react";
import { FaFlask, FaChevronDown, FaHtml5, FaCss3Alt, FaJs, FaReact, FaNodeJs, FaPhp, FaFigma, FaGithub } from "react-icons/fa";
import { SiTypescript, SiMongodb, SiExpress, SiMysql, SiIonic, SiDiscord } from "react-icons/si";
import "./TechStack.css";

export default function TechStack({ darkMode }) {
  const [activeTab, setActiveTab] = useState("All");
  const [showDropdown, setShowDropdown] = useState(false);

  // Map techs to icons if available
  const techIcons = {
    HTML: <FaHtml5 color="#E34F26" />,
    CSS: <FaCss3Alt color="#1572B6" />,
    JavaScript: <FaJs color="#F7DF1E" />,
    TypeScript: <SiTypescript color="#3178C6" />,
    React: <FaReact color="#61DAFB" />,
    "React Native": <FaReact color="#61DAFB" />,
    Ionic: <SiIonic color="#3880FF" />,
    "Node.js": <FaNodeJs color="#339933" />,
    PHP: <FaPhp color="#777BB4" />,
    MongoDB: <SiMongodb color="#47A248" />,
    "Express.js": <SiExpress color="#000000" />,
    MySQL: <SiMysql color="#4479A1" />,
    Figma: <FaFigma color="#F24E1E" />,
    GitHub: <FaGithub color="#181717" />,
    Discord: <SiDiscord color="#5865F2" />,
  };

  const techs = {
    All: [
      "HTML", "CSS", "JavaScript", "TypeScript", "SCSS", "React", "React Native", "Ionic",
      "Node.js", "PHP", "MongoDB", "Express.js", "MySQL", "REST API",
      "Figma", "VSCode", "GitHub", "JetBrains IntelliJ", "PyCharm", "Discord"
    ],
    Frontend: [
      "HTML", "CSS", "JavaScript", "TypeScript", "SCSS", "React", "React Native", "Ionic"
    ],
    Backend: [
      "Node.js", "PHP", "MongoDB", "Express.js", "MySQL", "REST API"
    ],
    "Tools & Frameworks": [
      "Figma", "VSCode", "GitHub", "JetBrains IntelliJ", "PyCharm", "Discord"
    ]
  };

  const filteredTechs = techs[activeTab];
  const categories = ["All", "Frontend", "Backend", "Tools & Frameworks"];

  return (
    <div className="tech-container">
      <div className={`tech-card ${darkMode ? "dark" : ""}`}>
        <div className="tech-header">
          <h3>
            <FaFlask className="header-icon" />
            Tech Stack
          </h3>

          <div className="dropdown-tab top-right">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className={darkMode ? "dark-btn" : ""}
            >
              {activeTab} <FaChevronDown style={{ fontSize: "12px", marginLeft: "4px" }} />
            </button>

            {showDropdown && (
              <div className="dropdown-menu">
                {categories.map(option => (
                  <button
                    key={option}
                    className="dropdown-item"
                    onClick={() => {
                      setActiveTab(option);
                      setShowDropdown(false);
                    }}
                  >
                    {activeTab === option ? "✓ " : ""}{option}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="tech-list">
          {filteredTechs.map(t => (
            <span key={t} className="tech-item">
              {/* Render icon only if available */}
              {techIcons[t] && <span className="tech-icon">{techIcons[t]}</span>} {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
