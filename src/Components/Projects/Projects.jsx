import "./Projects.css";
import { useState } from "react";
import {
  FaCss3Alt, FaNodeJs, FaDatabase,
  FaHtml5, FaJs, FaReact, FaServer, FaVial, FaPhp, FaMicrosoft
} from "react-icons/fa";
import { FiExternalLink, FiX, FiArrowRight, FiLayers } from "react-icons/fi";

import dmc1 from "../../assets/dmc-system1.jpg";
import dmc2 from "../../assets/dmc-system2.jpg";
import dmc3 from "../../assets/dmc-system3.jpg";

const ACCENT_COLORS = ["#7F77DD", "#1D9E75", "#378ADD", "#D85A30", "#D4537E"];

const projects = [
  {
    name: "GWA Calculator",
    desc: "Compute your General Weighted Average",
    detail:
      "A clean, fast tool for students to compute their General Weighted Average across subjects. Built with React and powered by Vite for snappy load times. Deployed on Vercel.",
    tech: [
      { label: "React", icon: <FaReact color="#61DAFB" /> },
      { label: "Vite", icon: <FaVial color="#646CFF" /> },
    ],
    status: "live",
    statusText: "Live & deployed",
    year: "2024",
    link: "https://gwa-calculator-reyn.vercel.app/",
  },
  {
    name: "Lifeline Web Promotion",
    desc: "Web promotion and marketing platform",
    detail:
      "A promotional website built for Lifeline featuring a responsive landing page and marketing sections. Pure HTML/CSS/JS stack with a focus on clean presentation and fast loading.",
    tech: [
      { label: "HTML5", icon: <FaHtml5 color="#E34F26" /> },
      { label: "CSS3", icon: <FaCss3Alt color="#1572B6" /> },
      { label: "JavaScript", icon: <FaJs color="#F7DF1E" /> },
    ],
    status: "inactive",
    statusText: "No public link available",
    year: "2023",
    link: null,
    images: [
      "https://placehold.co/400x300?text=Lifeline+Promotion+1",
      "https://placehold.co/400x300?text=Lifeline+Promotion+2",
      "https://placehold.co/400x300?text=Lifeline+Promotion+3"
    ],
  },
  {
    name: "RentGo",
    desc: "Car Rental Booking System",
    detail:
      "A full-stack car rental platform allowing users to browse vehicles, make bookings, and manage reservations. Features a React frontend, Node.js API server, and MySQL database.",
    tech: [
      { label: "React Native", icon: <FaReact color="#61DAFB" /> },
      { label: "React (Admin)", icon: <FaReact color="#61DAFB" /> },
      { label: "Node.js", icon: <FaNodeJs color="#3C873A" /> },
      { label: "MySQL", icon: <FaDatabase color="#4479A1" /> },
    ],
    status: "wip",
    statusText: "In progress — not yet deployed",
    year: "2024",
    link: null,
    images: [
      "https://placehold.co/400x300?text=RentGo+1",
      "https://placehold.co/400x300?text=RentGo+2",
      "https://placehold.co/400x300?text=RentGo+3"
    ],
  },
  {
    name: "DMC Property System",
    desc: "Equipment borrowing & tracking system",
    detail:
      "An internal property management system for DMC campus. Allows staff to log equipment borrowing, track availability, and generate usage reports.",
    tech: [
      { label: "VB.NET", icon: <FaMicrosoft color="#0078D4" /> },
      { label: "MySQL", icon: <FaDatabase color="#4479A1" /> },
    ],
    status: "inactive",
    statusText: "Internal use — no public link",
    year: "2023",
    link: null,
    images: [dmc1, dmc2, dmc3],
  },
];

export default function Projects({ darkMode }) {
  const [selectedProject, setSelectedProject] = useState(null);
  const [open, setOpen] = useState(false);

  const openModal = (p) => {
    setSelectedProject(p);
    setOpen(true);
  };

  const closeModal = () => setOpen(false);

  const idx = projects.indexOf(selectedProject);
  const accent = ACCENT_COLORS[idx] ?? ACCENT_COLORS[0];

  return (
    <div className={`pc-card ${darkMode ? "dark" : ""}`}>
      {/* Header */}
      <div className="pc-header">
        <div className="pc-header-left">
          <div className="pc-icon-wrap">
            <FiLayers size={15} />
          </div>
          <h3 className="pc-title">Recent Projects</h3>
        </div>
        <span className="pc-badge">{projects.length} projects</span>
      </div>

      {/* List */}
      <div className="pc-list">
        {projects.map((p, i) => (
          <div
            key={p.name}
            className="pc-item"
            style={{ "--accent": ACCENT_COLORS[i] }}
            onClick={() => openModal(p)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && openModal(p)}
          >
            <div className="pc-item-body">
              <p className="pc-item-name">{p.name}</p>
              <p className="pc-item-desc">{p.desc}</p>
            </div>
            <div className="pc-tech-pills">
              {p.tech.slice(0, 2).map((t) => (
                <span key={t.label} className="pc-tech-pill">
                  {t.label}
                </span>
              ))}
            </div>
            <FiArrowRight className="pc-arrow" size={14} />
          </div>
        ))}
      </div>

      {/* Modal */}
      {open && selectedProject && (
        <div
          className={`pc-overlay open ${darkMode ? "dark" : ""}`}
          onClick={(e) => e.target === e.currentTarget && closeModal()}
        >
          <div className="pc-modal">
            <div className="pc-modal-header">
              <div
                className="pc-modal-accent"
                style={{ color: accent, borderColor: accent + "33" }}
              >
                <FiLayers size={18} />
              </div>
              <button className="pc-modal-close" onClick={closeModal}>
                <FiX size={14} />
              </button>
            </div>

            <p className="pc-modal-name">{selectedProject.name}</p>
            <p className="pc-modal-desc">{selectedProject.desc}</p>

            <hr className="pc-divider" />

            {selectedProject.images && selectedProject.images.length > 0 && (
              <>
                <p className="pc-section-label">gallery</p>
                <div className="pc-modal-gallery" style={{ display: "flex", gap: "10px", overflowX: "auto", marginBottom: "15px", paddingBottom: "5px" }}>
                  {selectedProject.images.map((imgSrc, idx) => (
                    <img
                      key={idx}
                      src={imgSrc}
                      alt={`${selectedProject.name} screenshot ${idx + 1}`}
                      style={{ width: "200px", height: "120px", objectFit: "cover", borderRadius: "8px", flexShrink: 0 }}
                    />
                  ))}
                </div>
              </>
            )}

            <p className="pc-section-label">about</p>
            <p className="pc-detail-text">{selectedProject.detail}</p>

            <p className="pc-section-label">tech stack</p>
            <div className="pc-stack-pills">
              {selectedProject.tech.map((t) => (
                <span key={t.label} className="pc-stack-pill">
                  <span className="pc-stack-icon">{t.icon}</span>
                  {t.label}
                </span>
              ))}
            </div>

            <p className="pc-section-label">status</p>
            <div className="pc-status-row">
              <span className={`pc-status-dot ${selectedProject.status}`} />
              <span className="pc-status-text">{selectedProject.statusText}</span>
              <span className="pc-year">{selectedProject.year}</span>
            </div>


            <a
              href={selectedProject.link ?? "#"}
              target="_blank"
              rel="noopener noreferrer"
              className={`pc-modal-link ${!selectedProject.link ? "disabled" : ""}`}
              onClick={(e) => !selectedProject.link && e.preventDefault()}
            >
              <FiExternalLink size={14} />
              View live project
            </a>
          </div>
        </div>
      )
      }
    </div >
  );
}