import { FiArrowLeft, FiArrowUpRight, FiExternalLink } from "react-icons/fi";
import { motion } from "framer-motion";
import "./AllProjects.css";

import { projectsData } from "../data/projectsData";

const projects = projectsData;

export default function AllProjects({ onBack, onViewDetails }) {
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
        <h1 className="ap-title">projects</h1>
      </div>

      <div className="ap-list">
        {projects.map((p, idx) => (
          <div key={idx} className="ap-item">
            <div className="ap-left">
              <span className="ap-name">{p.name}</span>
            </div>
            <div className="ap-right">
              <span className="ap-category">{p.tags[1] || p.tags[0]}</span>
              <p className="ap-desc">{p.longDesc || p.desc}</p>
            </div>
            {p.link !== "#" ? (
              <a
                href={p.link}
                target="_blank"
                rel="noreferrer"
                className="ap-action-btn"
                title="View Live"
              >
                View Live <FiExternalLink size={13} />
              </a>
            ) : (
              <button
                className="ap-action-btn"
                onClick={() => onViewDetails && onViewDetails(p)}
              >
                View Details <FiArrowUpRight size={13} />
              </button>
            )}
          </div>
        ))}
      </div>
    </motion.div>
  );
}