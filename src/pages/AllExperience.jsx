import { FiArrowLeft } from "react-icons/fi";
import { motion } from "framer-motion";
import "./AllProjects.css"; // We can reuse the header styling from AllProjects
import "../Components/Experience/Experience.css"; // Reuse table styling

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

export default function AllExperience({ onBack }) {
  return (
    <motion.div 
      className="all-projects-page"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
    >
      <div className="ap-header">
        <button className="ap-back-btn" onClick={onBack}>
          <FiArrowLeft size={16} /> Back to Profile
        </button>
        <h1 className="ap-title">experience</h1>
      </div>

      <div className="exp-table" style={{ marginTop: '24px' }}>
        {entries.map((e, i) => (
          <div key={i} className="exp-row">
            <span className="exp-year">{e.year}</span>
            <span className="exp-title">{e.title}</span>
            <span className="exp-company">{e.company}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
