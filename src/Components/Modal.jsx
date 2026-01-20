import "./Modal.css";
import { FaTimes } from "react-icons/fa";

export default function Modal({ open, onClose, project, darkMode }) {
  if (!open || !project) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className={`modal-card ${darkMode ? "dark" : ""}`} onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          <FaTimes />
        </button>

        <div className="modal-header">
          <h3>{project.name}</h3>
          <p>{project.desc}</p>
        </div>

        <div className="modal-tech">
          {project.tech.map((t, idx) => (
            <span key={idx} className="modal-tech-icon">
              {t}
            </span>
          ))}
        </div>

        <div className="modal-actions">
          {project.link ? (
            <a
              href={project.link}
              target="_blank"
              rel="noreferrer"
              className="modal-btn"
            >
              Visit Project
            </a>
          ) : (
            <div className="modal-msg">
              This project is currently not deployed. You can request the demo or
              GitHub link anytime.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
