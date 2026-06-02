import { useState } from "react";
import {
  FaHtml5, FaCss3Alt, FaJs, FaReact, FaNodeJs,
  FaPhp, FaFigma, FaGithub, FaSass
} from "react-icons/fa";
import {
  SiTypescript, SiMongodb, SiExpress, SiMysql,
  SiIonic, SiDiscord, SiJetbrains
} from "react-icons/si";
import { VscCode } from "react-icons/vsc";
import { TbApi } from "react-icons/tb";
import "./TechStack.css";

const TABS = ["All", "Frontend", "Backend", "Tools"];

const DATA = {
  Frontend: [
    { label: "HTML", icon: <FaHtml5 color="#E34F26" /> },
    { label: "CSS", icon: <FaCss3Alt color="#1572B6" /> },
    { label: "JavaScript", icon: <FaJs color="#F7DF1E" /> },
    { label: "TypeScript", icon: <SiTypescript color="#3178C6" /> },
    { label: "SCSS", icon: <FaSass color="#CC6699" /> },
    { label: "React", icon: <FaReact color="#61DAFB" /> },
    { label: "React Native", icon: <FaReact color="#61DAFB" /> },
    { label: "Ionic", icon: <SiIonic color="#3880FF" /> },
  ],
  Backend: [
    { label: "Node.js", icon: <FaNodeJs color="#339933" /> },
    { label: "PHP", icon: <FaPhp color="#777BB4" /> },
    { label: "MongoDB", icon: <SiMongodb color="#47A248" /> },
    { label: "Express.js", icon: <SiExpress color="#888888" /> },
    { label: "MySQL", icon: <SiMysql color="#4479A1" /> },
    { label: "REST API", icon: <TbApi color="#6b7280" /> },
  ],
  Tools: [
    { label: "Figma", icon: <FaFigma color="#F24E1E" /> },
    { label: "VSCode", icon: <VscCode color="#0078D7" /> },
    { label: "GitHub", icon: <FaGithub color="#888780" /> },
    { label: "IntelliJ", icon: <SiJetbrains color="#fe2857" /> },
    { label: "PyCharm", icon: <SiJetbrains color="#21D789" /> },
    { label: "Discord", icon: <SiDiscord color="#5865F2" /> },
  ],
};

DATA.All = [...DATA.Frontend, ...DATA.Backend, ...DATA.Tools];

const SECTIONS = [
  { label: "Front-end", key: "Frontend" },
  { label: "Back-end", key: "Backend" },
  { label: "Tools & environments", key: "Tools" },
];

function PillGrid({ items }) {
  return (
    <div className="ts-grid">
      {items.map((item) => (
        <span key={item.label} className="ts-pill">
          <span className="ts-pill-icon">{item.icon}</span>
          <span className="ts-pill-label">{item.label}</span>
        </span>
      ))}
    </div>
  );
}

export default function TechStack({ darkMode }) {
  const [active, setActive] = useState("All");
  const items = DATA[active];

  return (
    <div className={`ts-card ${darkMode ? "dark" : ""}`}>
      {/* Header */}
      <div className="ts-header">
        <div className="ts-header-left">
          <div className="ts-icon-wrap">
            {/* inline SVG cpu icon */}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="4" y="4" width="16" height="16" rx="2" />
              <rect x="9" y="9" width="6" height="6" />
              <line x1="9" y1="1" x2="9" y2="4" />
              <line x1="15" y1="1" x2="15" y2="4" />
              <line x1="9" y1="20" x2="9" y2="23" />
              <line x1="15" y1="20" x2="15" y2="23" />
              <line x1="20" y1="9" x2="23" y2="9" />
              <line x1="20" y1="14" x2="23" y2="14" />
              <line x1="1" y1="9" x2="4" y2="9" />
              <line x1="1" y1="14" x2="4" y2="14" />
            </svg>
          </div>
          <h3 className="ts-title">Tech stack</h3>
        </div>
        <span className="ts-count">
          {items.length} technolog{items.length === 1 ? "y" : "ies"}
        </span>
      </div>

      {/* Filter tabs */}
      <div className="ts-tabs">
        {TABS.map((tab) => (
          <button
            key={tab}
            className={`ts-tab ${active === tab ? "active" : ""}`}
            onClick={() => setActive(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Pills — grouped when "All", flat otherwise */}
      {active === "All" ? (
        SECTIONS.map((s) => (
          <div key={s.key} className="ts-section">
            <p className="ts-section-label">{s.label}</p>
            <PillGrid items={DATA[s.key]} />
          </div>
        ))
      ) : (
        <PillGrid items={items} />
      )}
    </div>
  );
}