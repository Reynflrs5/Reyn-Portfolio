import "./Projects.css";
import { FaProjectDiagram } from "react-icons/fa";
import Modal from "../../Components/Modal";
import { useState } from "react";
import { 
  FaMobileAlt, 
  FaCss3Alt, 
  FaNodeJs, 
  FaDatabase, 
  FaHtml5, 
  FaJs, 
  FaReact, 
  FaServer, 
  FaVial 
} from "react-icons/fa"; // We'll use FaReact for React and custom icon for Vite if needed

export default function Projects({ darkMode }) {
  const [openModal, setOpenModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  const projects = [
    {
      name: "GWA Calculator",
      desc: "A calculator to compute your General Weighted Average",
      tech: [
        <FaReact key="1" color="#61DAFB" />, // React
        <FaVial key="2" color="#646CFF" />,  // Using FaVial as a placeholder for Vite
      ],
      link: "https://gwa-calculator-reyn.vercel.app/",
    },
    {
      name: "Lifeline Web Promotion",
      desc: "Web promotion and marketing platform",
      tech: [
        <FaHtml5 key="1" color="#E34F26" />,
        <FaCss3Alt key="2" color="#1572B6" />,
        <FaJs key="3" color="#F7DF1E" />,
      ],
      link: null,
    },
    {
      name: "RentGo",
      desc: "Car Rental Booking System",
      tech: [
        <FaReact key="1" color="#61DAFB" />,
        <FaServer key="2" color="#4D4D4D" />,
        <FaDatabase key="3" color="#4479A1" />,
      ],
      link: null,
    },
    {
      name: "Old Portfolio",
      desc: "My previous portfolio website",
      tech: [
        <FaReact key="1" color="#61DAFB" />,
        <FaNodeJs key="2" color="#3C873A" />,
      ],
      link: "https://reynflrs.vercel.app/",
    },
    {
      name: "PSU Mexico Property Management System",
      desc: "Equipment borrowing & tracking system",
      tech: [
        <FaServer key="1" color="#4D4D4D" />,
        <FaDatabase key="2" color="#4479A1" />,
      ],
      link: null,
    },
  ];

  const openProject = (project) => {
    setSelectedProject(project);
    setOpenModal(true);
  };

  return (
    <div className={`projects-card ${darkMode ? "dark" : ""}`}>
      {/* Header with icon */}
      <div className="projects-header">
        <div className="projects-title">
          <FaProjectDiagram className="projects-header-icon" />
          <h3>Recent Projects</h3>
        </div>
        <span className="projects-subtitle">Latest work</span>
      </div>

      {/* Project list */}
      <div className="projects-list">
        {projects.map((p) => (
          <div
            key={p.name}
            className="project-item"
            onClick={() => openProject(p)}
          >
            {/* Project Text */}
            <div className="project-text">
              <strong>{p.name}</strong>
              <p>{p.desc}</p>
            </div>

            {/* Tech Tooltip with colored icons */}
            {p.tech.length > 0 && (
              <div className="tech-tooltip">
                {p.tech.map((t, idx) => (
                  <span key={idx} className="tech-icon">
                    {t}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Modal */}
      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        project={selectedProject}
        darkMode={darkMode}
      />
    </div>
  );
}
