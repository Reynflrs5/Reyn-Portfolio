import { FiArrowRight } from "react-icons/fi";
import { motion } from "framer-motion";
import {
  FaHtml5, FaCss3Alt, FaJs, FaReact, FaNodeJs, FaPhp, FaFigma, FaGithub
} from "react-icons/fa";
import { SiTypescript, SiMysql, SiMongodb } from "react-icons/si";
import "./Experience.css";

const entries = [
  {
    year: "2026",
    title: "BS Information Technology — 4th Year",
    company: "Pampanga State University",
  },
  {
    year: "2025",
    title: "Back-end Development",
    company: "Node.js · MySQL · REST API",
  },
  {
    year: "2024",
    title: "Front-end Development",
    company: "HTML · CSS · JavaScript",
  },
  {
    year: "2023",
    title: "Started Learning Programming",
    company: "Hello World",
  },
];

const stack = [
  { label: "HTML", icon: <FaHtml5 color="#E34F26" /> },
  { label: "CSS", icon: <FaCss3Alt color="#1572B6" /> },
  { label: "JavaScript", icon: <FaJs color="#F7DF1E" /> },
  { label: "TypeScript", icon: <SiTypescript color="#3178C6" /> },
  { label: "React", icon: <FaReact color="#61DAFB" /> },
  { label: "React Native", icon: <FaReact color="#61DAFB" /> },
  { label: "Node.js", icon: <FaNodeJs color="#339933" /> },
  { label: "MySQL", icon: <SiMysql color="#4479A1" /> },
  { label: "PHP", icon: <FaPhp color="#777BB4" /> },
  { label: "MongoDB", icon: <SiMongodb color="#47A248" /> },
  { label: "Figma", icon: <FaFigma color="#F24E1E" /> },
  { label: "Git", icon: <FaGithub color="#ffffff" /> },
];

export default function Experience({ onViewAllExp, onViewAllStack }) {
  return (
    <div className="exp-section">
      {/* Experience Header */}
      <div className="exp-header">
        <h2 className="exp-label">03 — experience</h2>
        <button className="exp-link-btn" onClick={onViewAllExp}>
          FULL HISTORY <FiArrowRight size={12} />
        </button>
      </div>

      {/* Experience Rows */}
      <div className="exp-table">
        {entries.map((e, i) => (
          <motion.div
            key={i}
            className="exp-row"
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: i * 0.07 }}
          >
            <span className="exp-year">{e.year}</span>
            <span className="exp-title">{e.title}</span>
            <span className="exp-company">{e.company}</span>
          </motion.div>
        ))}
      </div>

      {/* Stack Header */}
      <div id="section-stack" className="exp-header" style={{ marginTop: "32px" }}>
        <h2 className="exp-label stack-label">STACK</h2>
        <button className="exp-link-btn" onClick={onViewAllStack}>
          VIEW ALL <FiArrowRight size={12} />
        </button>
      </div>

      {/* Stack Pills */}
      <div className="stack-pills">
        {stack.map((tech, i) => (
          <span key={i} className="stack-pill">
            <span className="stack-pill-icon">{tech.icon}</span>
            <span className="stack-pill-label">{tech.label}</span>
          </span>
        ))}
        <span className="stack-pill stack-pill-more">+ more</span>
      </div>
    </div>
  );
}